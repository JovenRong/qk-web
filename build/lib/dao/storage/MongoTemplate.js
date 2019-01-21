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
const url = 'mongodb://localhost:27017';
const dbName = 'sc_user';
let conn = null; //MongoClient.connect(url,  {poolSize: 3, useNewUrlParser: true })
const dbPromise = (uri, options) => {
    return mongodb_1.MongoClient.connect(uri, options);
};
const getConnection = function (uri, options) {
    return __awaiter(this, void 0, void 0, function* () {
        conn ? conn : (conn = yield dbPromise(url, options));
    });
};
getConnection(url, { poolSize: 3, useNewUrlParser: true });
function default_1() {
    const db = conn.db(dbName);
    const col = db.collection('user');
    col.find({}).toArray(function (err, items) {
        console.log('item', items.length);
    });
    //client.close()
}
exports.default = default_1;
;
//# sourceMappingURL=MongoTemplate.js.map