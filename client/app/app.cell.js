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
var Cell = (function () {
    function Cell() {
    }
    return Cell;
}());
exports.Cell = Cell;
var CellComponent = (function () {
    function CellComponent() {
    }
    return CellComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Cell)
], CellComponent.prototype, "cell", void 0);
CellComponent = __decorate([
    core_1.Component({
        selector: "cell",
        template: "\n    <div class=\"cell-pretext\">{{cell.pretext}}</div>\n    <div class=\"cell-query\">{{cell.query}}</div>\n    <div class=\"cell-output\">{{cell.output}}</div>\n    <div class=\"cell-posttext\">{{cell.posttext}}</div>\n  ",
    }),
    __metadata("design:paramtypes", [])
], CellComponent);
exports.CellComponent = CellComponent;
//# sourceMappingURL=app.cell.js.map