import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dateIn = Date.now();
    console.log(dateIn);

    return next.handle().pipe(
      tap(() => {
        const dateOut = Date.now();
        //let duree = dateOut - dateIn;
        // console.log('Temps de traitement : ' + duree + 'ms');
        console.log(`Temps de traitement :  ${dateOut - dateIn}ms`);
      }),
    );
  }
}
