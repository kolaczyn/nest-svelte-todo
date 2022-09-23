import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':guid')
  findOne(@Param('guid') guid: string) {
    return this.todosService.findOne(guid);
  }

  @Patch(':guid')
  update(@Param('guid') guid: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(guid, updateTodoDto);
  }

  @Delete(':guid')
  remove(@Param('guid') guid: string) {
    return this.todosService.remove(guid);
  }
}
