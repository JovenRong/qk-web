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
class QKRouter {
    constructor(qkapplication) {
        this.qkapplication = qkapplication;
    }
    handler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO 根据controller的注解信息生成router信息
            /*
            const url = request.url
            const pathName = url.pathname
            let controllerName = 'user'
            if (pathName.indexOf('pay') >= 0) {
              controllerName = 'pay'
            }
            let controller = require(this.qkapplication.controllerDir + Path.sep + controllerName)
            controller = typeof controller === 'function' ? controller : controller.default
            let controllerIns = new controller()
            controllerIns.process()
            return controllerName
             */
            return '';
        });
    }
}
exports.default = QKRouter;
//# sourceMappingURL=router.js.map