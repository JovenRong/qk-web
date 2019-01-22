"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../bean/controller");
function decoratorFactory(method, path, middlewares) {
    return (target, key, descriptor) => {
        controller_1.default.addMethod(target, method, path, key, middlewares);
        return descriptor;
    };
}
function All(path, middleware) {
    return decoratorFactory('*', path, middleware);
}
exports.All = All;
;
function Get(path, middleware) {
    decoratorFactory('OPTIONS', path, middleware);
    return decoratorFactory('GET', path, middleware);
}
exports.Get = Get;
;
function Post(path, middleware) {
    decoratorFactory('OPTIONS', path, middleware);
    return decoratorFactory('POST', path, middleware);
}
exports.Post = Post;
;
function Put(path, middleware) {
    return decoratorFactory('PUT', path, middleware);
}
exports.Put = Put;
;
function Patch(path, middleware) {
    return decoratorFactory('PATCH', path, middleware);
}
exports.Patch = Patch;
;
function Options(path, middleware) {
    return decoratorFactory('OPTIONS', path, middleware);
}
exports.Options = Options;
;
/*
 * TODO: HAPI not support HEAD
 * refer: https://hapijs.com/api#route.options.handler
export function Head(path: string, middleware?: any) {
  return decoratorFactory('HEAD', path, middleware)
}
*/
//# sourceMappingURL=methods.js.map