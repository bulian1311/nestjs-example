import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private tascService: TasksService) { }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTaskFilter): Promise<TaskEntity[]> {
    return this.tascService.getTasks(filterDto);
  };

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return this.tascService.getTaskById(id);
  };

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tascService.createTask(createTaskDto);
  };

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tascService.deleteTask(id);
  };

  @Patch('/:id/status')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<TaskEntity> {
    return this.tascService.updateTaskStatus(id, status);
  }
};
