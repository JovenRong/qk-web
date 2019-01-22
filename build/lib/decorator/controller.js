"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../bean/controller");
function default_1(path, middlewares) {
    return (target) => {
        controller_1.default.addBean(target, {
            path: path,
            middlewares: middlewares
        });
    };
}
exports.default = default_1;
;
//# sourceMappingURL=controller.js.map