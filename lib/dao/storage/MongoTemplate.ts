import { Collection, Db, MongoClient, MongoClientOptions } from 'mongodb';

const url = 'mongodb://localhost:27017';

const dbName = 'sc_user';

let conn = null; //MongoClient.connect(url,  {poolSize: 3, useNewUrlParser: true })

const dbPromise = (uri: string, options?: MongoClientOptions) => {
  return MongoClient.connect(uri, options);
}

const getConnection = async function (uri: string, options: MongoClientOptions) {
  conn ? conn : (conn = await dbPromise(url, options));
}

getConnection(url,  {poolSize: 3, useNewUrlParser: true });

export default function () {

    const db = conn.db(dbName);
    const col = db.collection('user');
    col.find({}).toArray(function(err, items) {
      console.log('item',items.length);
    });

    //client.close()
};
