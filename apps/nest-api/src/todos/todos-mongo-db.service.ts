import { Injectable, Logger } from '@nestjs/common';
import { Todo } from '@monorepo/data';
import { TodosService } from './todos.service';
import { MongoDbService } from '../db/mongo-db.service';

const DB_NAME = 'experiment';

const POSTS_COLLECTION_NAME = 'posts';

@Injectable()
export class TodosMongoDbService implements TodosService {
  logger = new Logger('TodosMongodbService');

  constructor(private dbService: MongoDbService) {
  }

  async getTodos(): Promise<Todo[]> {
    try {
      let conn = await this.dbService.getConnection();
      if (!conn) {
        this.logger.error('No db connection returned');
      }
      const db = conn.db(DB_NAME);
      const todos = await db.collection(POSTS_COLLECTION_NAME).find().toArray();

      return todos.map(todo => ({
        id: todo._id,
        title: todo.title
      }));

    } catch (err) {
      this.logger.error(err, 'Failed to getTodos()');
      throw err;
    }
  }

  async getTodo(id: string): Promise<Todo> {
    const conn = await this.dbService.getConnection();
    const db = conn.db(DB_NAME);
    const todosCollection = await db.collection(POSTS_COLLECTION_NAME)
    const todo = await todosCollection.findOne({ _id: id });
    if ( !todo ) {
      throw new Error('No such todo');
    }
    return {
      id: todo._id,
      title: todo.title
    }
  }

  async addTodo(todo: Todo): Promise<Todo> {
    let conn = await this.dbService.getConnection();
    const db = conn.db(DB_NAME);
    const todosCollection = await db.collection(POSTS_COLLECTION_NAME);
    const result = await todosCollection.insertOne({
      title: todo.title
    });

    return {
      ...todo,
      id: result.insertedId
    };
  }

  async reset(): Promise<void> {
    try {
      const conn = await this.dbService.getConnection();
      await conn.db(DB_NAME).collection(POSTS_COLLECTION_NAME).deleteMany({});
      await this.addTodo({ title: 'How to Database' });
      await this.addTodo({ title: 'How to Authentication' });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async deleteTodo(id: number): Promise<void> {
    const conn = await this.dbService.getConnection();
    await conn.db(DB_NAME)
      .collection(POSTS_COLLECTION_NAME)
      .deleteOne({
        _id: id
      });
  }

}
