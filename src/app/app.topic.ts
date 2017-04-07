import { Component } from "@angular/core";
import { Cell } from "./app.cell";

@Component({
  selector: "my-app",
  template: `
    <h1>{{title}}</h1>
    <h2>Resolução</h2>
    <div class="cells">
      <cell *ngFor="let cell of cells">
      </cell>
    </div>
  `,
})
export class AppTopic {
  title= "Apurações";
  cells: Cell[] = [
    new Cell(),
    new Cell(),
    new Cell()
  ]
}
