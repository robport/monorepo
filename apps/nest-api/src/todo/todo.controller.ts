import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Todo } from '@monorepo/data';

@Controller('todos')
export class TodoController {
  todos: Todo[];

  constructor() {
    this.reset();
  }

  @Get()
  findAll() {
    console.log('findall');
    return this.todos;
  }

  @Post()
  create(@Body() todo: Todo) {
    if (!todo || !todo.title) {
      throw new BadRequestException('Expected todo in body');
    }

    const newId = Math.max.apply(Math, this.todos.map(todo => todo.id)) + 1;

    this.todos.push({
      id: newId,
      title: todo.title
    });

    return this.todos[newId - 1];
  }

  @Get('reset')
  reset() {
    this.todos = [
      { id: 1, title: 'First' },
      { id: 2, title: 'Second Todo' }
    ];
    return { message: 'reset success' };
  }

  @Get(':id')
  findOne(@Param() params): Todo {
    const id = Number.parseInt(params.id);
    if (id > this.todos.length || Number.isNaN(id)) {
      throw new NotFoundException(`No such todo ${params.id}`);
    }
    return this.todos[id];
  }

}

