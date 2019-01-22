"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bean_1 = require("../bean/bean");
function default_1(name) {
    if (typeof name === 'string') {
        return (target) => {
            bean_1.default.addBean(name || target, target);
        };
    }
    else {
        bean_1.default.addBean(name, name);
        return name;
    }
}
exports.default = default_1;
;
//# sourceMappingURL=bean.js.map