import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodosService } from './todos.service';
import { Todo } from '@monorepo/data';

class MockTodoService extends TodosService {
  addTodo(todo: Todo): Promise<Todo> {
    return Promise.resolve(undefined);
  }

  deleteTodo(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getTodo(id: string): Promise<Todo> {
    return Promise.resolve(undefined);
  }

  getTodos(): Promise<Todo[]> {
    return Promise.resolve([]);
  }

  reset(): Promise<any> {
    return Promise.resolve(undefined);
  }

}

describe('Todo Controller', () => {
  let controller: TodoController;

  const mockTodoService =

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [ { provide: TodosService, useClass: MockTodoService}]
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
