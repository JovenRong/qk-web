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
const decorator_1 = require("../../lib/decorator");
const UserService_1 = require("./UserService");
let User = class User {
    constructor() {
    }
    process({ uid }) {
        //return 'hello';
        return 'this is user process ' + uid + ', ' + this.userService.hello();
    }
    list() {
        return 'this is user list';
    }
};
__decorate([
    decorator_1.Autowired(UserService_1.default),
    __metadata("design:type", UserService_1.default)
], User.prototype, "userService", void 0);
__decorate([
    decorator_1.Get('/process/{uid}'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], User.prototype, "process", null);
__decorate([
    decorator_1.Post('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "list", null);
User = __decorate([
    decorator_1.Controller('/user'),
    __metadata("design:paramtypes", [])
], User);
exports.default = User;
//# sourceMappingURL=user.js.map