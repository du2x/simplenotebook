import { Component } from "@angular/core";

@Component({
  selector: "cell",
  template: `
    <span class="cell-pretext">{{pretext}}</span>
    <span class="cell-query">{{query}}</span>
    <span class="cell-output">{{output}}</span>
    <span class="cell-posttext">{{posttext}}</span>
  `,
})
export class Cell {
  pretext: string;
  query: string;
  output: string;
  posttext: string;

  constructor(){
    this.pretext = "preencha aqui primeiro";
  }
}
