import { Component, Input } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Cell } from "./app.cell";
import { FSService } from "./fsservice"
import { ICell, CellType, ITopic } from './interfaces';
import { AccordionModule } from 'ngx-bootstrap';


export class Topic implements ITopic{
  title: string;
  description: string;
  loaded: boolean;
  filename: string;
  created: Date;
  modified: Date;
  cells: ICell[];
  constructor(title:string, filename:string){
    this.loaded=false;
    this.title=title;
    this.filename=filename;
    this.cells=[];
  }
  cleanCells(){
    this.cells=[];
  }
  copyObjProperties(topicobj:ITopic){ // todo: look for generic implementation
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
    <accordion-group heading="{{topic.title}}" (click)=clicked()  [class.modified]="dirty">
      <div class="topic-pane container" >
        <div  (dblclick)="editingDescription=true">
          <pre class="editable" *ngIf=!editingDescription placeholder="">{{topic.description || "Descrição"}}</pre>
          <textarea fz-elastic cols="" rows="" *ngIf=editingDescription (blur)="editingDescription=false"
          [(ngModel)]=topic.description NgControlDefault>{{topic.description}}</textarea>
        </div>
        <div class="cells">
          <cell [cell]=cell *ngFor="let cell of topic.cells" (onModified)="onModified($event)">
          </cell>
        </div>
        <!--button (click)="clean()">Clean Cells</button-->
        <div class="row">
          <div class="col-11">
            <button class="btn btn-sm btn-outline-primary" (click)="addTextCell()">Add Text</button>
            <button class="btn btn-sm btn-outline-primary" (click)="addQueryCell()">Add Query</button>
          </div>
          <div class="col-1">
            <button class="btn btn-sm btn-success" (click)="save($event)" [disabled]="!dirty">Save</button>
          </div>
        </div>
      </div>
    </accordion-group>
  `,
  providers: [AccordionModule,]
})
export class TopicComponent {
  // todo: remove cell functionality
  @Input()
  topic:Topic;
  dirty: boolean;
  editingDescription:boolean;
  constructor(private fsservice: FSService){ this.dirty=false; }
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
  onModified(dirty:boolean){
    this.dirty=dirty;
  }
  clean(){
    this.topic.cleanCells();
    console.log(this.topic);
  }
  addTextCell(){
    this.topic.cells.push(new Cell(CellType.Text));
  }
  addQueryCell(){
    this.topic.cells.push(new Cell(CellType.Query));
  }
  save(event:any){
    this.fsservice.saveTopicFile(this.topic.filename, this.topic.stringify()).subscribe(
      data => { console.log(data); },
      error => console.error('Error on reading topic.'),
      () => {
        this.dirty=false;
        var target = event.target || event.srcElement || event.currentTarget;
        target.innerText = "Salvou!"
        setTimeout(function(){ target.innerText = "Salvar"; }, 3000);
      }
    );
  }
}
