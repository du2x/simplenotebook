import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { AppTopic }  from './app.topic';
import { Cell }  from './app.cell';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule // <-- import the FormsModule before binding with [(ngModel)]
  ],
  declarations: [
    AppTopic,
    Cell
  ],
  bootstrap: [ AppTopic ]
})
export class AppModule { }
