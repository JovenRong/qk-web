"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const componentManager_1 = require("../componentManager");
function default_1(component) {
    return (target, key) => {
        Object.defineProperty(target, key, {
            get: function () {
                let ins = componentManager_1.default.getService(component);
                return ins;
            },
            enumerable: true,
            configurable: true
        });
    };
}
exports.default = default_1;
;
//# sourceMappingURL=autowired.js.map