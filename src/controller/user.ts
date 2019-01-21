import { Controller, Get, Post, Autowired } from '../../lib/decorator';
import UserService from './UserService';

@Controller('/user')
export default class User {

  @Autowired(UserService)
  private userService: UserService;

  constructor () {
  }

  @Get('/process/{uid}')
  public process ({ uid }) {
    //return 'hello';
    return 'this is user process ' + uid + ', ' + this.userService.hello();
  }


  @Post('/list')
  public list () {
    return 'this is user list';
  }
}

