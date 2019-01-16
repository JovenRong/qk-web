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
const componentManager_1 = require("./componentManager");
const defaultOptions = {
    root: process.cwd(),
    port: 3000,
    host: 'localhost',
};
class QKApplication {
    constructor(options) {
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
            let componentManager = new componentManager_1.default(this);
            componentManager.scan(this.options.componentDirs || [this.root]);
            yield this.server.register(Inert);
            yield this.server.start();
            console.log(`Server running at: ${this.server.info.uri}`);
            /*
            this.server.route({
              method: '*',
              path: '/{p*}',
              handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
              }
            })
            */
        });
    }
}
exports.default = QKApplication;
//process.on('unhandledRejection', (err) => {
//  console.log(err);
//  process.exit(1);
//});
//# sourceMappingURL=application.js.map