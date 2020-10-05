import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Todo } from '@monorepo/data';
import { TodosService } from './todos.service';
import { MariaDbService } from '../db/maria-db.service';

@Injectable()
export class TodosMariaDbService implements TodosService {
  logger = new Logger('TodosMariaDbService');

  constructor(private dbService: MariaDbService) {
  }

  async getTodos(): Promise<Todo[]> {
    try {
      let conn = await this.dbService.getConnection();
      if ( !conn ) {
        this.logger.error('No db connection returned');
      }

      const rows = await conn.query('SELECT id, title FROM todos');
      return rows.slice(0, rows.length);
    } catch (err) {
      this.logger.error(err, 'Failed to getTodos()');
      throw err;
    }
  }

  async getTodo(idStr: string): Promise<Todo> {
    const id = Number.parseInt(idStr);
    if (Number.isNaN(id)) {
      throw new NotFoundException(`Invalid id ${id}`);
    }

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

  async deleteTodo(idStr: string): Promise<void> {
    const id = Number.parseInt(idStr);
    if (Number.isNaN(id)) {
      throw new NotFoundException(`Invalid id ${id}`);
    }
    let conn = await this.dbService.getConnection();
    await conn.query(
      `DELETE FROM todos WHERE id=${id};`
    );
    return Promise.resolve();
  }

}
