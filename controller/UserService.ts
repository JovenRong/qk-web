import { Service, Autowired } from '../lib/decorators'

@Service('userService')
export default class UserService {

  constructor () {
    console.log('new UserService')
  }

  public hello (): string {
    return 'hello userService'
  }

}

