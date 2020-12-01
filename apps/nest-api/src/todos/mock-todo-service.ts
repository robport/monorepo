import { TodosService } from './todos.service';
import { Todo } from '@monorepo/data';

export class MockTodoService extends TodosService {
  todos: Todo[] = [];
  nextId: number = 0;

  addTodo(todo: Todo): Promise<Todo> {
    todo.id = this.nextId;
    this.nextId++;
    this.todos.push(todo);
    return Promise.resolve(todo);
  }

  deleteTodo(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getTodo(id: string): Promise<Todo> {
    return Promise.resolve(undefined);
  }

  getTodos(): Promise<Todo[]> {
    return Promise.resolve(this.todos);
  }

  reset(): Promise<any> {
    this.todos = [];
    return Promise.resolve(undefined);
  }

}
