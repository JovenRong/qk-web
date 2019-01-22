"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const service_1 = require("../bean/service");
const bean_1 = require("../bean/bean");
const dao_1 = require("../bean/dao");
let compileTrick;
let getBean = function (key) {
    let ins = null;
    let target = [];
    if (key.indexOf('ervice') >= 0) {
        target.push(service_1.default);
        target.push(dao_1.default);
    }
    else {
        target.push(dao_1.default);
        target.push(service_1.default);
    }
    target.push(bean_1.default);
    for (let i = 0; i < target.length; i++) {
        ins = target[i].getBean(key);
        if (ins) {
            return ins;
        }
    }
    return null;
};
function default_1(component, propertyName) {
    if (typeof component === 'string') {
        return (target, key) => {
            util_1.redefineProperty(target, key, {
                get: function () {
                    return getBean(component || key);
                }
            });
        };
    }
    else {
        util_1.redefineProperty(component, propertyName, {
            get: function () {
                return getBean(propertyName);
            }
        });
        return compileTrick;
    }
}
exports.default = default_1;
;
//# sourceMappingURL=autowired.js.map