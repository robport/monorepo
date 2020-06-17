import { Todo } from '@monorepo/data';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class TodosService {
  abstract getTodos(): Promise<Todo[]>

  abstract getTodo(id: number): Promise<Todo>

  abstract addTodo(todo: Todo): Promise<Todo>

  abstract deleteTodo(id: number): Promise<void>

  abstract reset(): Promise<any>
}
