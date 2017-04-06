"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Apurações';
        this.cells = cells;
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n    <h1>{{title}}</h1>\n    <h2>Resolu\u00E7\u00E3o</h2>\n    <ul class=\"cells\">\n      <li *ngFor=\"let cell of cells\">\n        <span>{{cell.query}}</span>\n      </li>\n    </ul>\n  ",
    })
], AppComponent);
exports.AppComponent = AppComponent;
var Cell = (function () {
    function Cell() {
    }
    return Cell;
}());
exports.Cell = Cell;
var cells = [
    { pretext: 'Vamos investigar esta poha agora.', query: 'select * from sistemas_ai', output: '<table><tr><td>oi</td></tr></table>' },
    { pretext: 'Vamos investigar esta poha agora.', query: 'select * from sistemas_ai', output: '<table><tr><td>oi</td></tr></table>' },
    { pretext: 'Vamos investigar esta poha agora.', query: 'select * from sistemas_ai', output: '<table><tr><td>oi</td></tr></table>' }
];
//# sourceMappingURL=app.component.js.map