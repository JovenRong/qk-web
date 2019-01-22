"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bean_1 = require("./bean");
class Service {
    static init() {
    }
    static initBeans() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    static addBean(key, target) {
        bean_1.default.addBean0(Service.container, target, {
            key: key
        });
    }
    static getBean(name) {
        return bean_1.default.getBean0(Service.container, name);
    }
    static destroy() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
Service.container = new Map();
exports.default = Service;
//# sourceMappingURL=service.js.map