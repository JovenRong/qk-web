import { Service, Autowired } from '../../../lib';

@Service
export default class PayService {

  constructor () {
    console.log('new payService');
  }

  public hello (): string {
    return 'hello payService';
  }

}

