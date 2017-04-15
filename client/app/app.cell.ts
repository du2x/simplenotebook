import { Component, EventEmitter, Input, Output, OnChanges, AfterContentInit, SimpleChange } from "@angular/core";
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
    <div *ngIf="cell.type==CellType.Text">
      <div (dblclick)="editingText=true">
        <pre class="editable" *ngIf=!editingText placeholder="">{{cell.text || "Text"}}</pre>
        <textarea cols="" rows="" *ngIf=editingText (blur)="editingText=false"
        [(ngModel)]=cell.text NgControlDefault>{{cell.text}}</textarea>
      </div>
    </div>
    <div *ngIf="cell.type==CellType.Query">
      <div (dblclick)="editingQuery=true">
        <pre class=query class="editable" *ngIf=!editingQuery placeholder="">{{cell.query || "Query"}}</pre>
        <textarea class=txt-query cols="" rows="" *ngIf=editingQuery (blur)="editingQuery=false"
        [(ngModel)]=cell.query NgControlDefault>{{cell.query}}</textarea>
      </div>
      <button class="btn-execute btn btn-sm btn-secondary" (click)="execute()">Go!</button>
      <div class="visual-clear" ></div>
      <div class="cell-output">{{cell.output}}</div>
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
  constructor() {
    this.editingText = false;
    this.editingQuery = false;
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    console.log(changes);
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
        this.lastCheckedCell = new Cell(changedProp.currentValue.type)
        this.lastCheckedCell.copy(changedProp.currentValue);
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        this.setDirty(true);
        log.push(`${propName} changed from ${from} to ${to}`);
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
