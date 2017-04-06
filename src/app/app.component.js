"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var app_cell_1 = require("./app.cell");
var AppComponent = (function () {
    function AppComponent() {
        this.title = "Apurações";
        this.cells = [
            new app_cell_1.Cell(),
            new app_cell_1.Cell(),
            new app_cell_1.Cell()
        ];
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        template: "\n    <h1>{{title}}</h1>\n    <h2>Resolu\u00E7\u00E3o</h2>\n    <div class=\"cells\">\n      <cell *ngFor=\"let cell of cells\">\n      </cell>\n    </div>\n  ",
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map