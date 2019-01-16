import { Controller, Get, Post } from '../lib/decorators'

@Controller('/pay')
export default class Pay {

  constructor () {
  
  }

  @Get('/process')
  public process (): void {
    console.log('this is pay process')
  }

  @Post('/edit')
  public edit (): void {
    console.log('this is pay edit')
  }
}

