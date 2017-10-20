import { Component, Input } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Cell } from "./app.cell";
import { FSService } from "./fsservice"
import { ICell, CellType, ITopic } from './interfaces';


export class Topic implements ITopic{
  title: string;
  loaded: boolean;
  filename: string;
  dirty: boolean;
  created: Date;
  modified: Date;
  cells: ICell[];
  constructor(title:string, filename:string){
    this.loaded=false;
    this.title=title;
    this.filename=filename;
    this.cells=[];
    this.dirty=false;
  }
  cleanCells(){
    this.cells=[];
  }
  copyObjProperties(topicobj:ITopic){ // todo: look for generic implementation
    this.title = topicobj.title;
    this.filename = topicobj.filename;
    this.cells =  topicobj.cells;
    this.created = topicobj.created;
    this.modified = topicobj.modified;
  }
  stringify(){
    return JSON.stringify({'title':this.title, 'filename':this.filename,
    'cells': this.cells, 'created': this.created, 'modified':this.modified});
  }
}

@Component({
  selector: "topic",
  template: `
    <div *ngIf="topic" [class.modified]="topic.dirty">
      <h3>{{topic.title}}</h3>
      <div class="topic-pane container" >
        <div class="cells">
          <cell [cell]=cell *ngFor="let cell of topic.cells" (onModified)="onModified($event)">
          </cell>
        </div>
        <div class="row">
          <div class="col-11">
            <button class="btn btn-sm btn-outline-primary" (click)="addTextCell()">Add Text</button>
            <button class="btn btn-sm btn-outline-primary" (click)="addQueryCell()">Add Query</button>
          </div>
          <div class="col-1">
            <button class="btn btn-sm btn-success" (click)="save($event)" [disabled]="!topic.dirty">Save</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TopicComponent {
  // todo: remove cell functionality
  @Input()
  topic:Topic;
  constructor(private fsservice: FSService){}
  onModified(dirty:boolean){
    this.topic.dirty = dirty;
  }
  addTextCell(){
    this.topic.cells.push(new Cell(CellType.Text));
  }
  addQueryCell(){
    this.topic.cells.push(new Cell(CellType.Query));
  }
  save(event:any){
    this.topic.modified=new Date();
    this.fsservice.saveTopicFile(this.topic.filename, this.topic.stringify()).subscribe(
      data => { console.log(data); },
      error => console.error('Error on reading topic.'),
      () => {
        this.topic.dirty = false;
        var target = event.target || event.srcElement || event.currentTarget;
        target.innerText = "Salvou!";
        setTimeout(function(){ target.innerText = "Salvar"; }, 3000);
      }
    );
  }
}
