import { Controller, Get, Post, Autowired } from '../lib/decorators'
import UserService from './UserService'

@Controller('/user')
export default class User {

  @Autowired('userService' || UserService)
  private userService: UserService;

  constructor () {
  
  }

  @Get('/process/{uid}')
  public process ({ uid }) {
    return 'this is user process ' + uid + ', ' + this.userService.hello()
  }


  @Post('/list')
  public list () {
    return 'this is user list'
  }
}

