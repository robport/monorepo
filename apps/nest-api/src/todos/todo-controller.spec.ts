import request from 'supertest';
import { Test } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodosService } from './todos.service';
import { MockTodoService } from './mock-todo-service';
import { INestApplication } from '@nestjs/common';

describe('todo-controller unit test', function() {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        { provide: TodosService, useClass: MockTodoService }
      ]
    }).compile();

    this.service = moduleRef.get<TodosService>(TodosService);
    this.service.addTodo({ title: 'Go Skiing' });

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('calls mock service', function(done) {
    request(app.getHttpServer())
      .get('/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{ title: 'Go Skiing', id: 0 }], done);
  });
});
