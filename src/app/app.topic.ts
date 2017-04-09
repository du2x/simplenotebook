import { Component, Input } from "@angular/core";
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
}

@Component({
  selector: "topic",
  template: `
    <div class="topic" (click)="clicked($event)">
      <h2>{{topic.filename}}</h2>
      <div class="topic-pane" *ngIf=topic.active>
        <h3>{{topic.title}}</h3>
        <h4>{{topic.description}}</h4>
        <div class="cells">
          <cell [cell]=cell *ngFor="let cell of topic.cells">
          </cell>
        </div>
      </div>
    </div>
  `,
})
export class TopicComponent {
  @Input()
  topic:Topic
  constructor(private fsservice: FSService){ }
  clicked(event:Object){
    if(!this.topic.active){
      this.topic.active = true;
      if(!this.topic.loaded){
        this.topic.loaded = true;
        this.fsservice.readTopicFile(this.topic.filename).subscribe(
          topicobj => {
            this.topic.title = topicobj.title;
            this.topic.description = topicobj.description;
            topicobj.cells.forEach((cellobj:ICell) => {
                this.topic.cells.push(<Cell>cellobj);
              });
          },
          error => console.error('Error on reading topic.'),
          () => console.log('Topic reading complete.')
        );
      }
    }
    else {
      this.topic.active = false;
    }
  }
}
