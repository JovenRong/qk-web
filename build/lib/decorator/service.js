"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const componentManager_1 = require("../componentManager");
function default_1(name) {
    return (target) => {
        componentManager_1.default.addService(target, target);
        if (name) {
            componentManager_1.default.addService(name, target);
        }
    };
}
exports.default = default_1;
;
//# sourceMappingURL=service.js.map