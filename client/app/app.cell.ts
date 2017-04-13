import { Component, Input } from "@angular/core";
import { ICell, CellType } from './interfaces';

export class Cell implements ICell {
  type: CellType;
  text: string;
  query: string;
  output: string;
  constructor(type: CellType) {
    this.type = type;
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
  @Input()
  cell:Cell;
  editingText:boolean;
  editingQuery:boolean;
  public CellType = CellType;
  constructor() {
    this.editingText = false;
    this.editingQuery = false;
  }
}
