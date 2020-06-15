import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Todo } from '@monoreop-1/data';

@Controller('todos')
export class TodoController {
  todos: Todo[] = [
    { id: 1, title: 'First' },
    { id: 2, title: 'Second' }
  ];

  @Get()
  findAll() {
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

  @Get(':id')
  findOne(@Param() params): Todo {
    const id = Number.parseInt(params.id);
    return this.todos[id];
  }
}
