import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { TaskService } from './task/task.service';

@Controller('forvia')
export class AppController {
  constructor(private taskSer: TaskService) {}

  @Get('')
  getHello(): string {
    return '<h1>Hello Forvia!</h1>';
  }
  @Get('chifaa')
  getHello2(@Req() request: Request, @Res() response: Response) {
    console.log(request);

    return response.json({ message: 'Requete traitée', prenom: 'Chifaa' });
  }
}
