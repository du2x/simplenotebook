import { Component } from "@angular/core";
import { TopicComponent, Topic } from "./app.topic";
import { FSService } from "./fsservice"

@Component({
  selector: "my-app",
  template: `
    <h1>{{title}}</h1>
    <ul materialize="collapsible" data-collapsible="accordion" class="collapsible">
      <topic [topic]=topic *ngFor="let topic of topics">
      </topic>
    </ul>
  `,
  providers: [FSService],

})
export class AppMain {
  title: "Simple Notebook";
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
}
