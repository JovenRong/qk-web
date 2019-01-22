import { Controller, Get, Post, Autowired } from '../../lib';
import UserService from '../lib/account/UserService';
import PayService from '../lib/account/PayService';
//import * as ejs from 'ejs';

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
    let userService = new UserService();
    let ret = userService.hello();
    //let filename = '/Users/yijunchen/dev/7k7k/js/qk-web/public/view/a.html', data = {}, options = {};
    //ejs.renderFile(filename, data, options, function(err, str) {
    //  console.log(str);
    //});
    //return 'hello';
    return '<div style="color: red">' + ret + 'this is user process ' + uid + ', ' + this.userService.hello() + ', ' + this.payService.hello() + '</div>';
  }


  @Post('/list')
  public list () {
    return 'this is user list';
  }
}

