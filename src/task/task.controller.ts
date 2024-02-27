import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TaskDTO } from './DTO/task.dto';
import { Task } from './models/task';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  allTasks: Task[] = [];

  // constructor(
  //   private appSer: AppService,
  //   private taskSer: TaskService,
  // ) {}
  @Inject(TaskService) taskSer;
  //@Inject(AppService) appSer;

  @Get('test')
  appelerTest(@Res() response: Response) {
    return response.json(this.taskSer.testService());
  }

  @Get('all')
  getAllTasks(@Res() response: Response) {
    //console.log(response);

    return response.json({ allTasks: this.allTasks });
  }

  @Post('all')
  addTask(@Body() newTask: TaskDTO, @Res() response: Response) {
    // console.log(newTask instanceof TaskDTO);

    // newTask.prenom = 'nidhal';
    // delete newTask.statut;
    const { title, year, statut } = newTask;
    let id = uuidv4();
    let t = new Task(id, title, year, statut, new Date());
    this.allTasks.push(t);
    return response.json({
      message: 'Task Added',
      allTasks: this.allTasks,
    });
  }
  @Post('new-v2')
  addTaskV2(
    @Body('title') title,
    @Body('year') year,
    @Res() response: Response,
  ) {
    let id = uuidv4();
    let t = new Task(id, title, year, 'in progress', new Date());
    this.allTasks.push(t);
    return response.json({
      message: 'Task Added',
      allTasks: this.allTasks,
    });
  }

  @Get('search/:id')
  getTaskById(@Param('id') taskId, @Res() response: Response) {
    let t = this.allTasks.find((task) => task.id == taskId);
    if (!t) throw new NotFoundException("Ce task n'existe pas");
    return response.json(t);
  }

  @Put('edit/:id')
  updateTask(@Param('id') taskId, @Body() uTask, @Res() response: Response) {
    let i = this.allTasks.findIndex((task) => task.id == taskId);
    this.allTasks[i] = { id: taskId, ...uTask };
    return response.json({ message: 'task Updated' });
  }

  @Delete(':id')
  deleteTask(@Param('id') taskId, @Res() response: Response) {
    let i = this.allTasks.findIndex((task) => task.id == taskId);
    this.allTasks.splice(i, 1);
    return response.json({ message: 'task deleted' });
  }

  //   @Get('/filter')
  //   getTasksBetweenTwoYears(
  //     @Query('year', ParseIntPipe) year,
  //     @Res() response: Response,
  //   ) {
  //     console.log(typeof year);
  //     let tab = this.allTasks.filter((task) => task.year == year);

  //     return response.json(tab);
  //   }
  @Get('/filter')
  getTasksBetweenTwoYears(@Query() qp, @Res() response: Response) {
    let tab = this.allTasks.filter(
      (task) => task.year >= qp.startyear && task.year <= qp.endyear,
    );

    return response.json(tab);
  }
}
