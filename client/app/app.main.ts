import { Component } from "@angular/core";
import { TopicComponent, Topic } from "./app.topic";
import { FSService } from "./fsservice"
import { AccordionModule } from 'ngx-bootstrap';
import { ICell, ITopic } from './interfaces';


@Component({
  selector: "my-app",
  template: `
    <h1>{{title}}</h1>
    <div *ngIf="loadingTopicsList">
      Loading topics... please wait.
    </div>
    <div *ngIf="loadingTopicsList" style="text-align:center">
      <div *ngIf="creatingTopic">
        <span>Title: </span>
        <input [(ngModel)]="newTopicTitle" />
        <button class="btn  btn-success" (click)="newTopic()">Create Topic</button>
        <button *ngIf="creatingTopic" class="btn" (click)="creatingTopic=false">Cancel</button>
      </div>
      <button *ngIf="!creatingTopic" class="btn btn-outline-primary" (click)="creatingTopic=true">Add Topic</button>
    </div>
    <div class="topics">
      <accordion role="tablist" [closeOthers]="true">
        <topic [topic]=topic *ngFor="let topic of topics">
        </topic>
      </accordion>
    </div>
  `,
  providers: [FSService, AccordionModule],

})
export class AppMain {
  title: "Simple Notebook";
  newTopicTitle: string;
  creatingTopic: boolean;
  loadingTopicsList: boolean;
  topics: Topic[];
  constructor(private fsservice: FSService){
    this.topics = [];
    this.listTopics();
    this.creatingTopic = false;
    this.loadingTopicsList = true;
  }
  listTopics(){
    this.topics=[];
    this.fsservice.listFiles()
      .subscribe(
        topicfiles => {
          topicfiles.forEach((topic:ITopic) => {
              this.topics.push(new Topic(topic.title, topic.filename));
            });
            this.loadingTopicsList = false;
        },
        error => console.error('Topics listing error'),
        () => console.log('Topics listing complete.')
      );
  }
  newTopic(){
    this.fsservice.newTopicFile(this.newTopicTitle)
      .subscribe(
        status => { console.log(status) },
        error => console.error('Topics creating error'),
        () => console.log('Topics creating complete.')
      );
      this.newTopicTitle = "";
      this.creatingTopic=false;
      this.listTopics();
  }
}
