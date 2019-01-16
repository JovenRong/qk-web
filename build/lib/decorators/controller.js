"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const componentManager_1 = require("../componentManager");
function default_1(path, middleware) {
    return (target) => {
        componentManager_1.default.addControllerMeta({
            target,
            path,
            middleware
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=controller.js.map