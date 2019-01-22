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
const Hapi = require("hapi");
const Inert = require("inert");
const Hoek = require("hoek");
const bean_1 = require("./bean");
const prestart_1 = require("./prestart");
const defaultOptions = {
    root: process.cwd(),
    port: 3000,
    host: 'localhost',
    view: process.cwd(),
    configNS: 'node-web',
};
class Application {
    constructor(options) {
        this.applicationConfigurations = {};
        options = Hoek.applyToDefaults(defaultOptions, options, true);
        this.root = options.root;
        this.server = new Hapi.Server({
            port: options.port,
            host: options.host
        });
        this.options = options;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            prestart_1.default(this);
            let dirs = this.options.componentDirs || [this.root];
            yield bean_1.default.scan(this, dirs);
            yield this.server.register(Inert);
            yield this.server.start();
            console.log(`Server running at: ${this.server.info.uri}`);
            this.registerExit();
        });
    }
    addConfiguration(configuration) {
        Hoek.merge(this.applicationConfigurations, configuration, false, true);
    }
    registerExit() {
        let exitHandler = function (options, code) {
            if (options && options.exit) {
                console.log('application exit at', code);
                bean_1.default.destroy();
                process.exit();
            }
            else {
                console.log('exception', code);
            }
        };
        process.on('exit', exitHandler.bind(this, { exit: true }));
        // catches ctrl+c event
        process.on('SIGINT', exitHandler.bind(this, { exit: true }));
        // catches "kill pid"
        process.on('SIGUSR1', exitHandler.bind(this, { exit: true }));
        process.on('SIGUSR2', exitHandler.bind(this, { exit: true }));
        // catches uncaught exceptions
        process.on('uncaughtException', exitHandler.bind(this, { exit: false }));
    }
}
exports.default = Application;
;
//process.on('unhandledRejection', (err) => {
//  console.log(err);
//  process.exit(1);
//});
//# sourceMappingURL=application.js.map