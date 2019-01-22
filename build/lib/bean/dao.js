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
class Dao {
    static init() {
    }
    static initBeans() {
        return __awaiter(this, void 0, void 0, function* () {
            const configNS = bean_1.default.application.options.configNS;
            const applicationConfig = bean_1.default.application.applicationConfigurations;
            if (!applicationConfig || !applicationConfig[configNS] || !applicationConfig[configNS].data) {
                return;
            }
            const dataConfigs = applicationConfig[configNS].data;
            let dbKeys = Object.keys(dataConfigs);
            for (let i0 = 0; i0 < dbKeys.length; i0++) {
                let db = dbKeys[i0];
                let dataConfig = dataConfigs[db];
                if (!Array.isArray(dataConfig)) {
                    dataConfig = [dataConfig];
                }
                let daoPath = dataConfig[0].dao || '../dao/storage/' + db;
                let dao = require(daoPath).default;
                let i = 0;
                for (let j = 0; j < dataConfig.length; j++) {
                    let config = dataConfig[j];
                    let beanName = db + '.' + (config.bean ? config.bean : 'db' + i);
                    if (!config.bean) {
                        i++;
                    }
                    let daoIns = new dao(config);
                    if (typeof config.autoconnect === 'undefined' || config.autoconnect) {
                        yield daoIns.connect();
                    }
                    Dao.addBean(beanName, daoIns);
                }
            }
        });
    }
    static addBean(name, target) {
        if (Dao.container.get(name)) {
            return;
        }
        Dao.container.set(name, target);
    }
    static getBean(name) {
        return Dao.container.get(name);
    }
    static destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            let daoIns = Array.from(Dao.container.values());
            for (let i = 0; i < daoIns.length; i++) {
                let ins = daoIns[i];
                yield ins.disconnect();
            }
        });
    }
    static remove(name) {
    }
}
Dao.container = new Map();
exports.default = Dao;
//# sourceMappingURL=dao.js.map