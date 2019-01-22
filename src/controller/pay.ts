import { Controller, Get, Post } from '../../lib';
import Mongo from '../../lib/dao/storage/MongoTemplate';

@Controller('/pay')
export default class Pay {

  constructor () {
    console.log('init pay');
  }

  @Get('/process')
  public process (): void {
    console.log('this is pay process');
    Mongo();
  }

  @Post('/edit')
  public edit (): void {
    console.log('this is pay edit');
  }
}

