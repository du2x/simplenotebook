import { Component } from "@angular/core";
import { TopicComponent, Topic } from "./app.topic";
import { FSService } from "./fsservice"
import { ICell, ITopic } from './interfaces';


@Component({
  selector: "my-app",
  template: `
  <div class="row">
    <div style="background-color:#bbb" class="col-lg-12">
      <div style="text-align:right">
        <div *ngIf="creatingTopic">
          <span>Title: </span>
          <input [(ngModel)]="newTopicTitle" />
          <button class="btn btn-sm btn-success" (click)="newTopic()">Create Topic</button>
          <button *ngIf="creatingTopic" class="btn btn-sm" (click)="creatingTopic=false">Cancel</button>
        </div>
        <button *ngIf="!creatingTopic" class="btn btn-sm btn-primary" (click)="creatingTopic=true">Add Topic</button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-3">
      <div *ngIf="loadingTopicsList">
        Loading topics... please wait.
      </div>
      <div class="topics">
        <div *ngFor="let topic of topics">
          <h5 style="background-color:#ddd;border:1px grey dashed; padding: 3px" (click)="clicked(topic)" [class.modified]="topic.dirty">{{topic.title}}</h5>
        </div>
      </div>
    </div>
    <div class="col-lg-9" id="topic-body">
      <topic [topic]=activeTopic>
      </topic>
    </div>
  </div>
  `,
  providers: [FSService],

})
export class AppMain {
  title: "Simple Notebook";
  newTopicTitle: string;
  creatingTopic: boolean;
  loadingTopicsList: boolean;
  activeTopic: Topic;
  topics: Topic[];
  constructor(private fsservice: FSService){
    this.topics = [];
    this.listTopics();
    this.creatingTopic = false;
    this.loadingTopicsList = true;
    this.activeTopic = null;
  }

  clicked(topic: Topic){
    this.activeTopic = topic;
    if(!this.activeTopic.loaded){ // avoid loading from file more than once
      this.activeTopic.loaded = true;
      this.fsservice.readTopicFile(this.activeTopic.filename).subscribe(
        topicobj => this.activeTopic.copyObjProperties(topicobj),
        error => console.error('Error on reading topic.'),
        () => console.log('Topic reading complete.')
      );
    }
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
