import { Component } from "@angular/core";
import { TopicComponent, Topic } from "./app.topic";
import { FSService } from "./fsservice"
import { AccordionModule } from 'ngx-bootstrap';
import { ICell, ITopic } from './interfaces';


@Component({
  selector: "my-app",
  template: `
    <h1>{{title}}</h1>
    <input [(ngModel)]="newTopicTitle" />
    <button (click)="newTopic()">Create Topic</button>
    <div class="topics">
    <accordion [closeOthers]="true">
      <topic [topic]=topic *ngFor="let topic of topics">
      </topic>
    </accordion>
  `,
  providers: [FSService, AccordionModule],

})
export class AppMain {
  title: "Simple Notebook";
  newTopicTitle: string;
  topics: Topic[];
  constructor(private fsservice: FSService){
    this.topics = [];
    this.listTopics();
  }
  listTopics(){
    this.topics=[];
    this.fsservice.listFiles()
      .subscribe(
        topicfiles => {
          topicfiles.forEach((topic:ITopic) => {
              this.topics.push(new Topic(topic.title, topic.filename));
            });
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
      this.listTopics();
  }
}
