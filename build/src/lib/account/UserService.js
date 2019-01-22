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
const lib_1 = require("../../../lib");
let UserService = class UserService {
    constructor() {
        console.log('new UserService');
    }
    hello() {
        let dbName = 'sc_user';
        let client = this.mongo.getClient();
        const db = client.db(dbName);
        const col = db.collection('user');
        col.find({}).toArray(function (err, items) {
            console.log(items);
            console.log('item', items.length);
        });
        return 'hello userService';
    }
};
__decorate([
    lib_1.Autowired('mongo.primary'),
    __metadata("design:type", Object)
], UserService.prototype, "mongo", void 0);
UserService = __decorate([
    lib_1.Service('userService0'),
    __metadata("design:paramtypes", [])
], UserService);
exports.default = UserService;
//# sourceMappingURL=UserService.js.map