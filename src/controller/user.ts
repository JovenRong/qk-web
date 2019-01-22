import { Controller, Get, Post, Autowired } from '../../lib';
import UserService from './UserService';
import PayService from './PayService';

@Controller('/user')
export default class User {

  @Autowired('userService0')
  private userService: UserService;

  @Autowired
  private payService: PayService;

  constructor () {
    console.log('init user');
  }

  @Get('/process/{uid}')
  public process ({ uid }) {
    //return 'hello';
    return 'this is user process ' + uid + ', ' + this.userService.hello() + ', ' + this.payService.hello();
  }


  @Post('/list')
  public list () {
    return 'this is user list';
  }
}

