"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FS = require("fs");
const Path = require("path");
const YAML = require("yaml");
const utils_1 = require("../utils");
function default_1(application, option) {
    let configDir = option && option.config;
    configDir = application.root + Path.sep + (configDir || 'config');
    utils_1.readDirSync(configDir, (fpath, isFile) => {
        if (fpath.endsWith('.yml') || fpath.endsWith('.json')) {
            let content = FS.readFileSync(fpath, 'utf8');
            if (!content) {
                return;
            }
            content = content.trim();
            if (fpath.endsWith('.yml')) {
                content = YAML.parse(content);
            }
            else {
                content = JSON.parse(content);
            }
            if (content) {
                application.addConfiguration(content);
            }
        }
    });
}
exports.default = default_1;
;
//# sourceMappingURL=config.js.map