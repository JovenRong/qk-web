import { Service, Autowired } from '../../lib/decorator';

@Service('userService0')
export default class UserService {

  constructor () {
    console.log('new UserService');
  }

  public hello (): string {
    return 'hello userService';
  }

}

