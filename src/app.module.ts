import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstMiddleware } from './first/first.middleware';
import { SecondMiddleware } from './second/second.middleware';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [AppController],
  providers: [AppService],
  // exports: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(FirstMiddleware).forRoutes('task/new');
    consumer.apply(FirstMiddleware, SecondMiddleware).forRoutes('task*');
    //consumer.apply(FirstMiddleware).forRoutes('task*');
    // { path: 'task/all', method: RequestMethod.GET },
    // { path: 'task/all', method: RequestMethod.POST }
    HelmetMiddleware.configure({});
    consumer.apply(HelmetMiddleware).forRoutes('');
  }
}
