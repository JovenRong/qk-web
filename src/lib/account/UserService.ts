import { Service, Autowired } from '../../../lib';

@Service('userService0')
export default class UserService {

  @Autowired('mongo.primary')
  private mongo;

  constructor () {
    console.log('new UserService');
  }

  public hello (): string {
    let dbName = 'sc_user';
    let client = this.mongo.getClient();
    const db = client.db(dbName);
    const col = db.collection('user');
    col.find({}).toArray(function(err, items) {
      console.log(items);
      console.log('item', items.length);
    });

    return 'hello userService';
  }

}

