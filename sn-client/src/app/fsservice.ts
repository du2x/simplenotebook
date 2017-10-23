import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class FSService {
  constructor(private dataservice: Http) { }
  listFiles(){
    return this.dataservice.get('http://localhost:5000/api/topics')
      .map(response => response.json());
  }
  readTopicFile(filename: string){
    return this.dataservice.get('http://localhost:5000/api/topics/'+filename)
      .map(response => response.json());
  }
  saveTopicFile(filename: string, filecontents:string){
    return this.dataservice.post('http://localhost:5000/api/topics/'+filename, filecontents)
      .map(response => response.json());
  }
  newTopicFile(title: string){
    return this.dataservice.put('http://localhost:5000/api/topics/'+title, "")
      .map(response => response.json());
  }
  executeQuery(query:string){
    return this.dataservice.post('http://localhost:5000/api/cell/execute', query)
      .map(response => response.json());
  }
}

