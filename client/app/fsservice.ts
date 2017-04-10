import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class FSService {
  constructor(private dataservice: Http) { }
  listFiles(){
    return this.dataservice.get('http://localhost:5000/list_files')
      .map(response => response.json());
  }
  readTopicFile(filename: string){
    return this.dataservice.get('http://localhost:5000/get/'+filename)
      .map(response => response.json());
  }
  saveTopicFile(filename: string, filecontents:string){
    return this.dataservice.post('http://localhost:5000/save/'+filename, filecontents)
      .map(response => response.json());
  }
}
