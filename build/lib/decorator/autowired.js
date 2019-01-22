"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const service_1 = require("../bean/service");
const bean_1 = require("../bean/bean");
let compileTrick;
let getBean = function (key) {
    let ins = service_1.default.getBean(key);
    if (!ins) {
        ins = bean_1.default.getBean(key);
    }
    return ins;
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