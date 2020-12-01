import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { Todo } from '@monorepo/data';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Todo')
@Controller('todos')
export class TodoController {
  todos: Todo[];

  constructor(private todosService: TodosService) {
  }

  @Get()
  async findAll() {
    return await this.todosService.getTodos();
  }

  @ApiCreatedResponse({ description: 'Todo created successfully', type: Todo })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() todo: Todo) {
    if (!todo || !todo.title) {
      throw new BadRequestException('Expected todo in body');
    }
    // todo - add user id to insert
    return this.todosService.addTodo(todo);
  }

  @UseGuards(JwtAuthGuard)
  @Get('reset')
  async reset() {
    await this.todosService.reset();
    return {
      success: true
    };
  }

  @Get(':id')
  findOne(@Param() params): Promise<Todo> {
    const todo = this.todosService.getTodo(params.id);
    if (!todo) {
      throw new NotFoundException(`No such todo ${params.id}`);
    }
    return todo;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') idParam: string) {
    await this.todosService.deleteTodo(idParam);
  }
}

