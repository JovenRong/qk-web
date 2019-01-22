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
const mongodb_1 = require("mongodb");
const defaultOptions = {
    poolSize: require('os').cpus().length,
    useNewUrlParser: true,
    autoReconnect: true,
    auth: null
};
class MongoDao {
    constructor(options) {
        this.options = {};
        if (!options || !options.url) {
            throw new Error('url is missing');
        }
        this.url = options.url;
        for (let k in defaultOptions) {
            if (options[k]) {
                this.options[k] = options[k];
            }
            else {
                this.options[k] = defaultOptions[k];
            }
        }
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.url) {
                throw new Error('url is missing');
            }
            if (!this.client) {
                this.client = yield mongodb_1.MongoClient.connect(this.url, this.options);
            }
            return this.client;
        });
    }
    getClient() {
        return this.client;
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client) {
                yield this.client.close();
            }
        });
    }
}
exports.default = MongoDao;
/*
export default function () {

  const db = conn.db(dbName);
  const col = db.collection('user');
  col.find({}).toArray(function(err, items) {
    console.log(items);
    console.log('item',items.length);
  });

  //client.close()
};
 */
//# sourceMappingURL=mongo.js.map