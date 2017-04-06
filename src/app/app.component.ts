import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>Resolução</h2>
    <ul class="cells">
      <li *ngFor="let cell of cells">
        <span>{{cell.query}}</span>
      </li>
    </ul>
  `,
})

export class AppComponent {
  title = 'Apurações';
  cells = cells;
}

export class Cell {
  pretext: string;
  query: string;
  output: string;
}

var cells: Cell[] = [
  {pretext: 'Vamos investigar esta poha agora.', query: 'select * from sistemas_ai', output: '<table><tr><td>oi</td></tr></table>'},
  {pretext: 'Vamos investigar esta poha agora.', query: 'select * from sistemas_ai', output: '<table><tr><td>oi</td></tr></table>'},
  {pretext: 'Vamos investigar esta poha agora.', query: 'select * from sistemas_ai', output: '<table><tr><td>oi</td></tr></table>'}
]
