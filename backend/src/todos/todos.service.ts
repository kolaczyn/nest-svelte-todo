import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as generateGuid } from 'uuid';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

const exampleTodos: Todo[] = [
  { done: false, guid: generateGuid(), title: 'Learn Nest' },
  { done: true, guid: generateGuid(), title: 'Learn React' },
  { done: false, guid: generateGuid(), title: 'Learn Svelte' },
];

@Injectable()
export class TodosService {
  private todos: Todo[] = exampleTodos;
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}
  create(createTodoDto: CreateTodoDto) {
    const guid = generateGuid();
    const newTodo: Todo = {
      guid,
      done: false,
      title: createTodoDto.title,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll() {
    return this.todosRepository.find();
    return this.todos;
  }

  findOne(guid: string) {
    const todo = this.getTodo(guid);

    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  update(guid: string, updateTodoDto: UpdateTodoDto) {
    const todo = this.getTodo(guid);

    if (!todo) {
      throw new NotFoundException();
    }
    const newTodo: Todo = {
      ...todo,
      ...updateTodoDto,
    };

    this.todos = [...this.todos.filter((t) => t.guid !== guid), newTodo];

    return newTodo;
  }

  remove(guid: string) {
    const todo = this.getTodo(guid);

    if (!todo) {
      throw new NotFoundException();
    }

    this.todos = this.todos.filter((t) => t.guid !== guid);

    return todo;
  }

  private getTodo(guid: string) {
    return this.todos.find((t) => t.guid === guid);
  }
}
