import { Injectable } from '@nestjs/common';
import { Todo } from '@monorepo/data';
import { TodosService } from './todos.service';
import { MariaDbService } from '../app/maria-db.service';

@Injectable()
export class TodosMariaDbService implements TodosService {

  constructor(private dbService: MariaDbService) {
  }

  async getTodos(): Promise<Todo[]> {
    let conn = await this.dbService.getConnection();
    const rows = await conn.query('SELECT id, title FROM todos');
    return rows.slice(0, rows.length);
  }

  async getTodo(id: number): Promise<Todo> {
    let conn = await this.dbService.getConnection();
    const rows = await conn.query(
      `SELECT id, title FROM todos WHERE id=${id}`);
    return rows.length > 0 ? rows[0] : undefined;
  }

  async addTodo(todo: Todo): Promise<Todo> {
    let conn = await this.dbService.getConnection();
    const result = await conn.query(
      `INSERT INTO todos(title) VALUES (?)`,
      [todo.title]
    );
    return {
      ...todo,
      id: result.id
    };
  }

  async reset(): Promise<any> {
    try {
      let conn = await this.dbService.getConnection();
      await conn.query(
        'DELETE FROM todos;'
      );
      await this.addTodo({ title: 'How to Database' });
      await this.addTodo({ title: 'How to Authentication' });
      return Promise.resolve(undefined);
    } catch (e) {
      return Promise.reject();
    }
  }

  async deleteTodo(id: number): Promise<void> {
    let conn = await this.dbService.getConnection();
    await conn.query(
      `DELETE FROM todos WHERE id=${id};`
    );
    return Promise.resolve(undefined);
  }

}
