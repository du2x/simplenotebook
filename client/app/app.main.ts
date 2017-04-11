import { Component } from "@angular/core";
import { TopicComponent, Topic } from "./app.topic";
import { FSService } from "./fsservice"

@Component({
  selector: "my-app",
  template: `
    <h1>{{title}}</h1>
    <input [(ngModel)]="newTopicTitle" />
    <button (click)="newTopic()">Create Topic</button>
    <div class="topics">
      <topic [topic]=topic *ngFor="let topic of topics">
      </topic>
    </div>
  `,
  providers: [FSService],

})
export class AppMain {
  title: "Simple Notebook";
  newTopicTitle: string;
  topics: Topic[];
  constructor(private fsservice: FSService){
    this.topics = [];
    fsservice.listFiles()
      .subscribe(
        topicfiles => {
          topicfiles.forEach((topic:string) => {
              this.topics.push(new Topic(topic));
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
    }
}
