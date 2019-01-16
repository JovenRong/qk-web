"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const URL_PATH_TRIM = /^\/*|\/*$/g;
var MetaType;
(function (MetaType) {
    MetaType[MetaType["Controller"] = 1] = "Controller";
    MetaType[MetaType["Service"] = 2] = "Service";
    MetaType[MetaType["Component"] = 3] = "Component";
    MetaType[MetaType["Repository"] = 4] = "Repository";
})(MetaType || (MetaType = {}));
class ComponentManager {
    constructor(qkApplication) {
        this.qkApplication = qkApplication;
    }
    scan(dirs) {
        dirs.forEach(dir => {
            utils_1.readDirSync(dir, (fpath, isFile) => {
                if (fpath.endsWith('.js')) {
                    ComponentManager.targetPropertyMetas = [];
                    ComponentManager.targetMeta = null;
                    require(fpath);
                    this.processTargetMeta(fpath);
                }
            });
        });
    }
    static addService(key, target) {
        if (ComponentManager.services.get(key)) {
            return;
        }
        if (typeof key === 'string' && ComponentManager.services.get(target)) {
            ComponentManager.services.set(key, ComponentManager.services.get(target));
        }
        else {
            ComponentManager.services.set(key, {
                target: target,
                ins: null
            });
        }
    }
    static getService(key) {
        if (!ComponentManager.services.get(key)) {
            return;
        }
        if (!ComponentManager.services.get(key).ins) {
            let target = ComponentManager.services.get(key).target;
            ComponentManager.services.get(key).ins = new target();
        }
        return ComponentManager.services.get(key).ins;
    }
    static addMeta(meta) {
        ComponentManager.targetPropertyMetas.push(meta);
    }
    static addControllerMeta(meta) {
        ComponentManager.targetMetaType = MetaType.Controller;
        ComponentManager.targetMeta = meta;
    }
    processTargetMeta(fpath) {
        if (ComponentManager.targetPropertyMetas.length < 1 || !ComponentManager.targetMeta) {
            return;
        }
        switch (ComponentManager.targetMetaType) {
            case MetaType.Controller:
                this.processControllerMetas();
                break;
        }
    }
    processControllerMetas() {
        let targetPath = ComponentManager.targetMeta.path || '';
        targetPath = targetPath.replace(URL_PATH_TRIM, '');
        if (targetPath) {
            targetPath = '/' + targetPath + '/';
        }
        ComponentManager.targetPropertyMetas.forEach(meta => {
            let path = meta.path || null;
            if (!path) {
                return;
            }
            path = targetPath + path.replace(URL_PATH_TRIM, '');
            console.log(meta);
            let key = path + "\0" + meta.method;
            ComponentManager.controllers[key] = {
                path: path,
                method: meta.method,
                target: ComponentManager.targetMeta.target,
                handler: meta.handler,
                ins: null
            };
            this.addRouter(key);
        });
    }
    addRouter(key) {
        let meta = ComponentManager.controllers[key];
        this.qkApplication.server.route({
            method: meta.method,
            path: meta.path,
            handler: (request, h) => {
                if (!meta.ins) {
                    meta.ins = new meta.target();
                }
                if (request.method === 'options') {
                    return '';
                }
                let ret = meta.ins[meta.handler](request.params);
                if (!ret) {
                    return '';
                }
                else {
                    return ret;
                }
            }
        });
    }
}
ComponentManager.controllers = {};
ComponentManager.services = new Map();
ComponentManager.components = {};
ComponentManager.repositories = {};
ComponentManager.targetPropertyMetas = [];
exports.default = ComponentManager;
//# sourceMappingURL=componentManager.js.map