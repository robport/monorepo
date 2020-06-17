import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Todo } from '@monorepo/data';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodoController {
  todos: Todo[];

  constructor(private todosService: TodosService) {
  }

  @Get()
  async findAll() {
    return await this.todosService.getTodos();
  }

  @Post()
  create(@Body() todo: Todo) {
    if (!todo || !todo.title) {
      throw new BadRequestException('Expected todo in body');
    }

    return this.todosService.addTodo(todo);
  }

  @Get('reset')
  async reset() {
    await this.todosService.reset();
  }

  @Get(':id')
  findOne(@Param() params): Promise<Todo> {
    const id = Number.parseInt(params.id);
    if (Number.isNaN(id)) {
      throw new NotFoundException(`Invalid id ${params.id}`);
    }
    const todo = this.todosService.getTodo(id);
    if (!todo) {
      throw new NotFoundException(`No such todo ${params.id}`);
    }
    return todo;
  }

  @Delete('/delete/:id')
  async delete(@Param('id') idParam: string) {
    console.log('delete', idParam)
    const id = Number.parseInt(idParam);
    if (Number.isNaN(id)) {
      throw new NotFoundException(`Invalid id ${id}`);
    }
    await this.todosService.deleteTodo(id);
  }

}

