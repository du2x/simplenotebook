import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class FSService {
	constructor(private dataservice: Http) { }
	listFiles(){
		return this.dataservice.get('http://localhost:5000/api/topics')
		.map(response => response.json());
	}
	readTopicFile(filename: string){
		return this.dataservice.get('http://localhost:5000/api/topics/' + filename)
			.map(response => response.json());
	}
	saveTopicFile(filename: string, filecontents:string){
		let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json'});
		let options = new RequestOptions({ headers: headers });
		return this.dataservice.put('http://localhost:5000/api/topics/' + filename, filecontents, options);
//	.map(response => response.json());
	}
	newTopicFile(title: string){
		let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json'});
		let options = new RequestOptions({ headers: headers });
		return this.dataservice.post('http://localhost:5000/api/topics/'+title, '', options);
//			.map(response => response.json());
	}
	executeQuery(query:string){
		return this.dataservice.post('http://localhost:5000/api/cell/execute', query)
			.map(response => response.json());
	}
}

