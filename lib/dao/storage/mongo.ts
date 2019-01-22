import { Collection, Db, MongoClient, MongoClientOptions } from 'mongodb';

import IDao from '../idao';

const defaultOptions = {
  poolSize: require('os').cpus().length,
  useNewUrlParser: true,
  autoReconnect: true,
  auth: null
}

export default class MongoDao implements IDao {

  private options = {};
  private url: string;
  private client: MongoClient;

  constructor (options) {
    if ( !options || !options.url ) {
      throw new Error('url is missing');
    }
    this.url = options.url;
    for (let k in defaultOptions) {
      if ( options[k] ) {
        this.options[k] = options[k];
      } else {
        this.options[k] = defaultOptions[k];
      }
    }
  }

  public async connect (): Promise<MongoClient> {
    if ( !this.url ) {
      throw new Error('url is missing');
    }
    if ( !this.client ) {
      this.client = await MongoClient.connect(this.url, this.options);
    }
    return this.client;
  }

  public getClient (): MongoClient {
    return this.client;
  }

  public async disconnect (): Promise<void> {
    if ( this.client ) {
      await this.client.close();
    }
  }
};
