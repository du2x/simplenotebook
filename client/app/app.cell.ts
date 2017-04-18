import { Component, EventEmitter, Input, Output, OnChanges,SimpleChange } from "@angular/core";
import { FSService } from "./fsservice"
import { ICell, CellType } from './interfaces';

export class Cell implements ICell {
  type: CellType;
  text: string;
  query: string;
  output: string;
  constructor(type: CellType) {
    this.type = type;
  }
  cmp(obj:ICell){
    return this.type==obj.type && this.text==obj.text && this.query == obj.query && this.output == obj.output;
  }
  copy(obj:ICell){ // todo: look for generic implementation
    this.type=obj.type;
    this.text=obj.text;
    this.query=obj.query;
    this.output=obj.output;
  }
}

@Component({
  selector: "cell",
  template: `
    <div class="row" *ngIf="cell.type==CellType.Text">
      <div class="col-12" (dblclick)="editingText=true">
        <pre class="editable" *ngIf=!editingText placeholder="">{{cell.text || "Text"}}</pre>
        <textarea fz-elastic cols="" rows="" *ngIf=editingText (blur)="editingText=false"
        [(ngModel)]=cell.text NgControlDefault>{{cell.text}}</textarea>
      </div>
    </div>
    <div *ngIf="cell.type==CellType.Query" class="row cell-query">
      <div (dblclick)="editingQuery=true" class="col-11">
        <pre class=query class="editable" *ngIf=!editingQuery placeholder="">{{cell.query || "Query"}}</pre>
        <textarea fz-elastic class=txt-query cols="" rows="" *ngIf=editingQuery (blur)="editingQuery=false"
        [(ngModel)]=cell.query NgControlDefault>{{cell.query}}</textarea>
        <div class="cell-output">{{cell.output}}</div>
      </div>
      <div class="col-1">
        <button class="btn-execute btn btn-sm btn-secundary" [disabled]="!cell.query" (click)="execute()">Go!</button>
      </div>
    </div>
  `,
})
export class CellComponent {
  lastCheckedCell: Cell;
  @Input() cell:Cell;
  @Output() onModified = new EventEmitter<boolean>();
  setDirty(dirty:boolean){
    this.onModified.emit(dirty);
  }
  changeDetected:boolean;
  editingText:boolean;
  editingQuery:boolean;
  public CellType = CellType;
  constructor(private fsservice: FSService) {
    this.editingText = false;
    this.editingQuery = false;
  }
  execute(){
    if(this.cell.query){
      this.fsservice.executeQuery(this.cell.query).subscribe(
        results => this.cell.output=results,
        error => console.error('Error on reading topic.'),
        () => console.log('Topic reading complete.')
      );
    }
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      if (changedProp.isFirstChange()) {
        this.lastCheckedCell = new Cell(changedProp.currentValue.type)
        this.lastCheckedCell.copy(changedProp.currentValue);
      } else {
        this.setDirty(true);
      }
    }
  }
  ngDoCheck() {
    if(!this.lastCheckedCell.cmp(this.cell)){
      this.setDirty(true);
      this.lastCheckedCell.copy(this.cell);
    }
  }
}
