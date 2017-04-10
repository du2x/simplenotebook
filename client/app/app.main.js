"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var app_topic_1 = require("./app.topic");
var fsservice_1 = require("./fsservice");
var AppMain = (function () {
    function AppMain(fsservice) {
        var _this = this;
        this.fsservice = fsservice;
        this.topics = [];
        fsservice.listFiles()
            .subscribe(function (topicfiles) {
            topicfiles.forEach(function (topic) {
                _this.topics.push(new app_topic_1.Topic(topic));
            });
        }, function (error) { return console.error('Topics listing error'); }, function () { return console.log('Topics listing complete.'); });
    }
    return AppMain;
}());
AppMain = __decorate([
    core_1.Component({
        selector: "my-app",
        template: "\n    <h1>{{title}}</h1>\n    <div class=\"topics\">\n      <topic [topic]=topic *ngFor=\"let topic of topics\">\n      </topic>\n    </div>\n  ",
        providers: [fsservice_1.FSService],
    }),
    __metadata("design:paramtypes", [fsservice_1.FSService])
], AppMain);
exports.AppMain = AppMain;
//# sourceMappingURL=app.main.js.map