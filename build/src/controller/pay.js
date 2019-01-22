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
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const MongoTemplate_1 = require("../../lib/dao/storage/MongoTemplate");
let Pay = class Pay {
    constructor() {
        console.log('init pay');
    }
    process() {
        setTimeout(function () {
            throw new Error('opps');
        }, 1000);
        console.log('this is pay process');
        MongoTemplate_1.default();
    }
    edit() {
        console.log('this is pay edit');
    }
};
__decorate([
    lib_1.Get('/process'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Pay.prototype, "process", null);
__decorate([
    lib_1.Post('/edit'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Pay.prototype, "edit", null);
Pay = __decorate([
    lib_1.Controller('/pay'),
    __metadata("design:paramtypes", [])
], Pay);
exports.default = Pay;
//# sourceMappingURL=pay.js.map