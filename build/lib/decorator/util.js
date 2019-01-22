"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hoek = require("hoek");
function redefineProperty(target, key, config) {
    if (!config) {
        return;
    }
    let config0 = {
        enumerable: true,
        configurable: true
    };
    Hoek.merge(config0, config);
    if (delete target[key]) {
        Object.defineProperty(target, key, config0);
    }
}
exports.redefineProperty = redefineProperty;
//# sourceMappingURL=util.js.map