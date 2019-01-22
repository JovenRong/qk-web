"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bean_1 = require("./bean");
const URL_PATH_TRIM = /^\/*|\/*$/g;
class Controller {
    static init() {
    }
    static initBeans() {
        return __awaiter(this, void 0, void 0, function* () {
            Controller.container.forEach(target => {
                let target0 = target.target, targetOptions = target.options, targetMethods = target.methods;
                if (!targetMethods || targetMethods.length < 1) {
                    return;
                }
                let controllerPath = targetOptions.path.replace(URL_PATH_TRIM, '');
                if (controllerPath) {
                    controllerPath = '/' + controllerPath + '/';
                }
                let controllerMiddlewares = targetOptions.middlewares;
                targetMethods.forEach(targetMethod => {
                    let { method, path, handler, middlewares } = targetMethod;
                    path = controllerPath + path.replace(URL_PATH_TRIM, '');
                    bean_1.default.application.server.route({
                        method: method,
                        path: path,
                        handler: (request, h) => {
                            if (!target.ins) {
                                target.ins = new target0();
                            }
                            if (request.method === 'options') {
                                return '';
                            }
                            let ret = target.ins[handler](request.params);
                            if (!ret) {
                                return '';
                            }
                            else {
                                return ret;
                            }
                        }
                    });
                });
            });
            Controller.currentMethods = null;
        });
    }
    static addBean(target, options) {
        // TODO 需要确定 先执行class decorator 还是 先执行method decorator
        Controller.container.set(target, {
            target: target,
            options: options,
            methods: Controller.currentMethods
        });
        Controller.currentMethods = null;
    }
    static addMethod(target, method, path, handler, middleware) {
        if (!path || !method) {
            return;
        }
        if (!Controller.currentMethods) {
            Controller.currentMethods = [];
        }
        Controller.currentMethods.push({
            method: method,
            path: path,
            handler: handler,
            middlewares: middleware
        });
    }
}
Controller.container = new Map();
exports.default = Controller;
//# sourceMappingURL=controller.js.map