import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class FirstMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.prenom = 'nidhal';
    console.log('Je suis le FirstMiddleware');
    next();
  }
}
