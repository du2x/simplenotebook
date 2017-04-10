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

  cleanCells(){
    this.cells=[];
  }

  activate(){
    this.active=true;
  }

  deactivate(){
    this.active=false;
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
      <h2 (click)="clicked($event)">{{topic.filename}}</h2>
      <div class="topic-pane" *ngIf=topic.active>
        <h3>{{topic.title}}</h3>
        <h4>{{topic.description}}</h4>
        <div class="cells">
          <cell [cell]=cell *ngFor="let cell of topic.cells">
          </cell>
        </div>
        <button (click)="clean($event)">Clean Cells</button>
        <button (click)="save($event)">Save</button>
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
      this.topic.activate();
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
      this.topic.deactivate();
    }
  }
  clean(event:Object){
    this.topic.cleanCells();
    console.log(this.topic);
  }
  save(event:Object){
    this.fsservice.saveTopicFile(this.topic.filename, this.topic.stringify()).subscribe(
      data => { console.log(data); },
      error => console.error('Error on reading topic.'),
      () => console.log('Topic saving complete.')
    );
  }
}
