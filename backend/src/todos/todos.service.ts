import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.todosRepository.create({
      done: false,
      title: createTodoDto.title,
    });

    await this.todosRepository.save(todo);
    return todo;
  }

  findAll() {
    return this.todosRepository.find();
  }

  async findOne(guid: string) {
    return await this.getSingleTodo(guid);
  }

  async update(guid: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.getSingleTodo(guid);

    todo.title = updateTodoDto.title;
    todo.done = updateTodoDto.done;
    await this.todosRepository.save(todo);

    return todo;
  }

  async remove(guid: string) {
    const todo = await this.getSingleTodo(guid);
    await this.todosRepository.delete({ guid });

    return todo;
  }

  private async getSingleTodo(guid: string) {
    const todo = await this.todosRepository.findOneBy({ guid });
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }
}
