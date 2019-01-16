"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
let controllers = {};
let services = {};
let components = {};
let repositories = {};
let componentScan = function (qkApplication, dirs) {
    dirs.forEach(dir => {
        utils_1.readDirSync(dir, (fpath, isFile) => {
            if (fpath.endsWith('.js')) {
                require(fpath);
                console.log(fpath);
                console.log('========');
            }
        });
    });
};
componentScan.addController = function () {
};
exports.default = componentScan;
//# sourceMappingURL=componentscan.js.map