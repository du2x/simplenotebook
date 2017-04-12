import { Component, Input } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Cell } from "./app.cell";
import { FSService } from "./fsservice"
import { ICell, ITopic } from './interfaces';
import { AccordionModule } from 'ngx-bootstrap';


export class Topic implements ITopic{
  title: string;
  description: string;
  loaded: boolean;
  filename: string;
  created: Date;
  modified: Date;
  cells: Cell[];
  constructor(title:string, filename:string){
    this.loaded=false;
    this.title=title;
    this.filename=filename;
    this.cells=[];
  }
  cleanCells(){
    this.cells=[];
  }
  copyObjProperties(topicobj:ITopic){
    this.title = topicobj.title;
    this.description = topicobj.description;
    this.filename = topicobj.filename;
    this.cells =  topicobj.cells;
    this.created = topicobj.created;
    this.modified = topicobj.modified;
  }
  stringify(){
    return JSON.stringify({'title':this.title, 'description': this.description,
                            'filename':this.filename, 'cells': this.cells,
                             'created': this.created, 'modified':this.modified});
  }
}

@Component({
  selector: "topic",
  template: `
    <accordion-group heading="{{topic.title}}" (click)=clicked()>
      <div class="topic-pane" >
        <div (dblclick)="editingDescription=true">
          <pre class="editable" *ngIf=!editingDescription placeholder="">{{topic.description || "Descrição"}}</pre>
          <textarea cols="" rows="" *ngIf=editingDescription (blur)="editingDescription=false"
          [(ngModel)]=topic.description NgControlDefault>{{topic.description}}</textarea>
        </div>
        <div class="cells">
          <cell [cell]=cell *ngFor="let cell of topic.cells">
          </cell>
        </div>
        <!--button (click)="clean()">Clean Cells</button-->
        <button (click)="save()">Save</button>
      </div>
    </accordion-group>
  `,
  providers: [AccordionModule,]
})
export class TopicComponent {
  @Input()
  topic:Topic
  editingDescription:boolean
  constructor(private fsservice: FSService){ }
  clicked(){
    if(!this.topic.loaded){ // avoid loading from file more than once
      this.topic.loaded = true;
      this.fsservice.readTopicFile(this.topic.filename).subscribe(
        topicobj => this.topic.copyObjProperties(topicobj),
        error => console.error('Error on reading topic.'),
        () => console.log('Topic reading complete.')
      );
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
