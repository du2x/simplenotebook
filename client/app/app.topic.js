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
var fsservice_1 = require("./fsservice");
var Topic = (function () {
    function Topic(filename) {
        this.active = false;
        this.loaded = false;
        this.filename = filename;
        this.cells = [];
    }
    Topic.prototype.cleanCells = function () {
        this.cells = [];
    };
    Topic.prototype.activate = function () {
        this.active = true;
    };
    Topic.prototype.deactivate = function () {
        this.active = false;
    };
    Topic.prototype.stringify = function () {
        return JSON.stringify({ 'title': this.title, 'description': this.description,
            'filename': this.filename, 'cells': this.cells });
    };
    return Topic;
}());
exports.Topic = Topic;
var TopicComponent = (function () {
    function TopicComponent(fsservice) {
        this.fsservice = fsservice;
        this.editingDescription = false;
        this.editingTitle = false;
    }
    TopicComponent.prototype.editDescription = function ($event) {
        this.editingDescription = true;
        //     let target = $event.target || $event.srcElement;
        //     target.nextElementSibling.focus(); // not working yet.
    };
    TopicComponent.prototype.clicked = function () {
        var _this = this;
        if (!this.topic.active) {
            this.topic.activate();
            if (!this.topic.loaded) {
                this.topic.loaded = true;
                this.fsservice.readTopicFile(this.topic.filename).subscribe(function (topicobj) {
                    _this.topic.title = topicobj.title;
                    _this.topic.description = topicobj.description;
                    topicobj.cells.forEach(function (cellobj) {
                        _this.topic.cells.push(cellobj);
                    });
                }, function (error) { return console.error('Error on reading topic.'); }, function () { return console.log('Topic reading complete.'); });
            }
        }
        else {
            this.topic.deactivate();
        }
    };
    TopicComponent.prototype.clean = function () {
        this.topic.cleanCells();
        console.log(this.topic);
    };
    TopicComponent.prototype.save = function () {
        this.fsservice.saveTopicFile(this.topic.filename, this.topic.stringify()).subscribe(function (data) { console.log(data); }, function (error) { return console.error('Error on reading topic.'); }, function () { return console.log('Topic saving complete.'); });
    };
    return TopicComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Topic)
], TopicComponent.prototype, "topic", void 0);
TopicComponent = __decorate([
    core_1.Component({
        selector: "topic",
        template: "\n    <div class=\"topic\">\n      <h2 (click)=\"clicked()\">{{topic.filename}}</h2>\n      <div class=\"topic-pane\" *ngIf=topic.active>\n        <h3>{{topic.title}}</h3>\n        <h4 *ngIf=!editingDescription (dblclick)=\"editDescription($event)\">{{topic.description}}</h4>\n        <textarea *ngIf=editingDescription (blur)=\"editingDescription=false\">{{topic.description}}</textarea>\n        <div class=\"cells\">\n          <cell [cell]=cell *ngFor=\"let cell of topic.cells\">\n          </cell>\n        </div>\n        <button (click)=\"clean()\">Clean Cells</button>\n        <button (click)=\"save()\">Save</button>\n      </div>\n    </div>\n  ",
    }),
    __metadata("design:paramtypes", [fsservice_1.FSService])
], TopicComponent);
exports.TopicComponent = TopicComponent;
//# sourceMappingURL=app.topic.js.map