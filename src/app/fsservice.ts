import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { ICell, ITopic } from './interfaces';
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
}
