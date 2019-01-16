import { Controller, Get, Post } from '../lib/decorators'

@Controller('/user')
export default class User {

  constructor () {
  
  }

  @Get('/process/{uid}')
  public process ({ uid }) {
    return 'this is user process ' + uid
  }


  @Post('/list')
  public list () {
    return 'this is user list'
  }
}

