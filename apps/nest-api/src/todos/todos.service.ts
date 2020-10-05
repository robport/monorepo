import { Todo } from '@monorepo/data';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class TodosService {
  abstract getTodos(): Promise<Todo[]>

  abstract getTodo(id: number | string): Promise<Todo>

  abstract addTodo(todo: Todo): Promise<Todo>

  abstract deleteTodo(id: number | string ): Promise<void>

  abstract reset(): Promise<any>
}
