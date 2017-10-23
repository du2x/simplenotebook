import { Component, EventEmitter, Input, Output, OnChanges, SimpleChange } from "@angular/core";
import { FSService } from "./fsservice";
import { ICell, CellType } from './interfaces';
import { buildHtmlTable } from './js2table';

export class Cell implements ICell {
  type: CellType;
  content: string;
  output: string;
  datetime: Date;
  //connection: string;
  
  constructor(type: CellType) {
    this.type = type;
    this.content = '';
    this.output = '';
    this.datetime = new Date();
  }
  cmp(obj:ICell){
    return this.type==obj.type 
            && this.content==obj.content 
            && this.datetime==obj.datetime;
  }
  copy(obj:ICell){ // todo: look for generic implementation
  // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
    this.type=obj.type;
    this.content=obj.content;
    this.output=obj.output;
    this.datetime= obj.datetime
  }
}

@Component({
  selector: "cell",
  template: `
    <div class="row" *ngIf="cell.type==CellType.Text">
      <div class="col-12" (dblclick)="editingText=true">
        <pre class="editable" *ngIf=!editingText placeholder="">{{cell.content || "Text"}}</pre>
        <textarea fz-elastic cols="" rows="" *ngIf=editingText (blur)="editingText=false"
        [(ngModel)]=cell.content NgControlDefault>{{cell.content}}</textarea>
      </div>
    </div>
    <div *ngIf="cell.type==CellType.Query" class="row cell-query">
      <div (dblclick)="editingQuery=true" class="col-11">
        <pre class=query  *ngIf=!editingQuery placeholder="">{{cell.content || "Query"}}</pre>
        <textarea fz-elastic class=txt-query cols="" rows="" *ngIf=editingQuery (blur)="editingQuery=false"
        [(ngModel)]=cell.content NgControlDefault>{{cell.content}}</textarea>
        <div *ngIf="cell.output" class="cell-output" [innerHtml]=cell.output></div>
      </div>
      <div class="col-1">
        <button class="btn-execute btn btn-sm btn-secundary" [disabled]="!cell.content" (click)="execute()">Go!</button>
      </div>
    </div>
  `,
})
export class CellComponent {
  lastCheckedCell: Cell;
  @Input() cell:Cell;
  @Output() onModified = new EventEmitter<boolean>(true);
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
    if(this.cell.content){
      this.fsservice.executeQuery(this.cell.content).subscribe(
        results => {
          if(results['status']=='SUCCESS') {
            this.cell.output=buildHtmlTable(JSON.parse(results['payload']));
            this.cell.datetime=new Date();
          }
          else
            this.cell.output=results['message'];
        },
        error => {
          console.error('Error on query execution.');
          this.cell.output="Query execution failure. TODO: capture error details."
        },
        () => console.log('Query executing complete.')
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
      this.cell.datetime = new Date();
      this.lastCheckedCell.copy(this.cell);
    }
  }
}
