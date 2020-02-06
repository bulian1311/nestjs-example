import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilter } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) { }

  async getTasks(filterDto: GetTaskFilter): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: number): Promise<TaskEntity> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with id: ${id} not found.`);
    }

    return found;
  };


  createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto);
  };


  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: ${id} not found.`);
    }


  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<TaskEntity> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
