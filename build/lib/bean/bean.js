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
class Bean {
    static init(application) {
        Bean.application = application;
    }
    static initBeans() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    static addBean0(container, target, options) {
        let key = options.key;
        if (container.get(key)) {
            return;
        }
        if (typeof key !== 'string') {
            if (!key.name) {
                return;
            }
            key = `${key.name[0].toLowerCase()}${key.name.slice(1)}`;
        }
        container.set(key, {
            target: target,
            ins: null
        });
    }
    static addBean(target, options) {
        Bean.addBean0(Bean.container, target, options);
    }
    static getBean0(container, name) {
        if (!container.get(name)) {
            return;
        }
        const beanInfo = container.get(name);
        if (!beanInfo.ins) {
            const target = beanInfo.target;
            beanInfo.ins = new (beanInfo.target)();
        }
        return beanInfo.ins;
    }
    static getBean(name) {
        return Bean.getBean0(Bean.container, name);
    }
    static destroy() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    static remove(name) {
    }
}
Bean.container = new Map();
exports.default = Bean;
//# sourceMappingURL=bean.js.map