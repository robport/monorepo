import { BadRequestException, Injectable } from '@nestjs/common';
import { Todo } from '@monorepo/data';
import { TodosService } from './todos.service';

@Injectable()
export class TodosArrayService extends TodosService {
  todos: Todo[] = [];

  constructor() {
    super();
  }

  addTodo(todo: Todo): Promise<Todo> {
    if (!todo || !todo.title) {
      throw new BadRequestException('Expected todo in body');
    }

    const newId = Math.max.apply(Math, this.todos.map(todo => todo.id)) + 1;

    this.todos.push({
      id: newId,
      title: todo.title
    });
    return Promise.resolve(this.todos[newId - 1]);
  }

  getTodo(id: number): Promise<Todo> {
    return Promise.resolve(this.todos.find(todo => todo.id === id));
  }

  getTodos(): Promise<Todo[]> {
    return Promise.resolve(this.todos);
  }

  reset(): Promise<any> {
    this.todos = [
      { id: 1, title: 'First' },
      { id: 2, title: 'Second Todo' }
    ];
    return Promise.resolve({ message: 'reset success' });
  }

  deleteTodo(id: number): Promise<void> {
    this.todos = this.todos.filter(todo => todo.id != id);
    return Promise.resolve(undefined);
  }
}

