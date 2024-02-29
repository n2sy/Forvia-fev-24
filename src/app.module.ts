import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { FirstMiddleware } from './first/first.middleware';
import { SecondMiddleware } from './second/second.middleware';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

dotenv.config();

@Module({
  imports: [
    TaskModule,
    BookModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DBNAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  //exports: [AppService],
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
