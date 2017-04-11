import { Component, Input, ElementRef, Renderer2 } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Cell } from "./app.cell";
import { FSService } from "./fsservice"
import { ICell, ITopic } from './interfaces';

export class Topic implements ITopic{
  title: string;
  description: string;
  active: boolean;
  loaded: boolean;
  filename: string;
  cells: Cell[];

  constructor(filename:string){
    this.active=false;
    this.loaded=false;
    this.filename=filename;
    this.cells=[];
  }
  cleanCells(){
    this.cells=[];
  }
  activate(){
    this.active=true;
  }
  deactivate(){
    this.active=false;
  }
  copyObjProperties(topicobj:ITopic){
    this.title = topicobj.title;
    this.description = topicobj.description;
    this.filename = topicobj.filename;
    this.cells =  topicobj.cells;
  }
  stringify(){
    return JSON.stringify({'title':this.title, 'description': this.description,
                            'filename':this.filename, 'cells': this.cells});
  }
}

@Component({
  selector: "topic",
  template: `
    <div class="topic">
      <h2 (click)="clicked()">{{topic.filename}}</h2>
      <div class="topic-pane" *ngIf=topic.active>
        <h3>{{topic.title}}</h3>
        <div (dblclick)="editingDescription=true">
          <span *ngIf=!editingDescription>{{topic.description}}</span>
          <textarea *ngIf=editingDescription (blur)="editingDescription=false"
          [(ngModel)]=topic.description NgControlDefault>{{topic.description}}</textarea>
        </div>
        <div class="cells">
          <cell [cell]=cell *ngFor="let cell of topic.cells">
          </cell>
        </div>
        <button (click)="clean()">Clean Cells</button>
        <button (click)="save()">Save</button>
      </div>
    </div>
  `,
})
export class TopicComponent {
  @Input()
  topic:Topic
  editingDescription:boolean
  constructor(private fsservice: FSService){ }
  clicked(){
    if(!this.topic.active){
      this.topic.activate();
      if(!this.topic.loaded){ // avoid loading from file more than once
        this.topic.loaded = true;
        this.fsservice.readTopicFile(this.topic.filename).subscribe(
          topicobj => this.topic.copyObjProperties(topicobj),
          error => console.error('Error on reading topic.'),
          () => console.log('Topic reading complete.')
        );
      }
    }
    else {
      this.topic.deactivate();
    }
  }
  clean(){
    this.topic.cleanCells();
    console.log(this.topic);
  }
  save(){
    this.fsservice.saveTopicFile(this.topic.filename, this.topic.stringify()).subscribe(
      data => { console.log(data); },
      error => console.error('Error on reading topic.'),
      () => console.log('Topic saving complete.')
    );
  }
}
