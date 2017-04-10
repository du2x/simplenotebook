import { Component, Input } from "@angular/core";
import { ICell } from './interfaces';

export class Cell implements ICell {
  pretext: string;
  query: string;
  output: string;
  posttext: string;
  constructor() { }
}

@Component({
  selector: "cell",
  template: `
    <div class="cell-pretext">{{cell.pretext}}</div>
    <div class="cell-query">{{cell.query}}</div>
    <div class="cell-output">{{cell.output}}</div>
    <div class="cell-posttext">{{cell.posttext}}</div>
  `,
})
export class CellComponent {
  @Input()
  cell:Cell;
  constructor() { }
}
