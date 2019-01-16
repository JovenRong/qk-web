import { Controller, Get, Post } from '../lib/decorators'

@Controller('/user')
export default class User {

  constructor () {
  
  }

  @Get('/process/{uid}')
  public process ({ uid }): void {
    console.log('this is user process ' + uid)
  }


  @Post('/list')
  public list (): void {
    console.log('this is user list')
  }
}

