"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sealed = (target, key, descriptor) => {
    if (descriptor === undefined) {
        descriptor = Object.getOwnPropertyDescriptor(target, key);
    }
    var originalMethod = descriptor.value;
    //editing the descriptor/value parameter
    /*
      descriptor.value = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i - 0] = arguments[_i];
          }
          var a = args.map(function (a) { return JSON.stringify(a); }).join();
        // note usage of originalMethod here
          var result = originalMethod.apply(this, args);
          var r = JSON.stringify(result);
          console.log("Call: " + key + "(" + a + ") => " + r);
          return result;
      };
     */
    // return edited descriptor as opposed to overwriting the descriptor
    return descriptor;
};
exports.RouterMap = (url) => {
    return (target) => {
        //const meta: ExpressMeta = getMeta(target.prototype);
        //meta.url = url;
        //meta.middleware = middleware;
    };
};
//# sourceMappingURL=decorator.js.map