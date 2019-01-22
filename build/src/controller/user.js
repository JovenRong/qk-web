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
const UserService_1 = require("../lib/account/UserService");
const PayService_1 = require("../lib/account/PayService");
//import * as ejs from 'ejs';
let User = class User {
    constructor() {
        console.log('init user');
    }
    process({ uid }) {
        let userService = new UserService_1.default();
        let ret = userService.hello();
        //let filename = '/Users/yijunchen/dev/7k7k/js/qk-web/public/view/a.html', data = {}, options = {};
        //ejs.renderFile(filename, data, options, function(err, str) {
        //  console.log(str);
        //});
        //return 'hello';
        return '<div style="color: red">' + ret + 'this is user process ' + uid + ', ' + this.userService.hello() + ', ' + this.payService.hello() + '</div>';
    }
    list() {
        return 'this is user list';
    }
};
__decorate([
    lib_1.Autowired('userService0'),
    __metadata("design:type", UserService_1.default)
], User.prototype, "userService", void 0);
__decorate([
    lib_1.Autowired,
    __metadata("design:type", PayService_1.default)
], User.prototype, "payService", void 0);
__decorate([
    lib_1.Get('/process/{uid}'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], User.prototype, "process", null);
__decorate([
    lib_1.Post('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "list", null);
User = __decorate([
    lib_1.Controller('/user'),
    __metadata("design:paramtypes", [])
], User);
exports.default = User;
//# sourceMappingURL=user.js.map