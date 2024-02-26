import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('task')
export class TaskController {
  allTasks = [];

  @Get('all')
  getAllTasks(@Res() response: Response) {
    return response.json({ allTasks: this.allTasks });
  }

  @Post('new')
  addTask(@Body() newTask, @Res() response: Response) {
    this.allTasks.push(newTask);
    return response.json({
      message: 'Task Added',
      allTasks: this.allTasks,
    });
  }
}
