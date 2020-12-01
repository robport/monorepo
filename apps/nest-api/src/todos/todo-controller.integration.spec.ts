import request from 'supertest';
import { Test } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodosService } from './todos.service';
import { INestApplication } from '@nestjs/common';
import { TodosMongoDbService } from './todos-mongo-db.service';
import { MongoDbService } from '../db/mongo-db.service';
import { ConfigService } from '@nestjs/config';

describe('todo-controller integration test', function() {
  let app: INestApplication;

  beforeEach(async () => {
    process.env.MONGO_DB_URL = process.env.MONGO_URL

    const moduleRef = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        { provide: TodosService, useClass: TodosMongoDbService },
        { provide: MongoDbService, useClass: MongoDbService },
        { provide: ConfigService, useClass: ConfigService }
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
      .expect(res => {
        console.log(res.body)
        expect(res.body[0].title).toBe(('Go Skiing'))
        expect(res.body[0].id).toBeDefined()
      })
      .expect(200, done);
  });
});
