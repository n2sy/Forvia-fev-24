import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  testService() {
    return { message: 'test réussi' };
  }
}
