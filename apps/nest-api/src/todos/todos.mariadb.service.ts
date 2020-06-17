import { Injectable } from '@nestjs/common';
import * as mariaDb from 'mariadb';
import { Pool, PoolConnection } from 'mariadb';
import { Todo } from '@monorepo/data';
import { TodosService } from './todos.service';
import { environment } from '../environments/environment';

@Injectable()
export class TodosMariaDbService implements TodosService{

  pool: Pool;

  constructor() {
    console.log('host:', process.env.DB_HOST)
    console.log('user:', process.env.DB_USER)
    console.log('production:', environment.production)

    this.pool = mariaDb.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'system',
      password: process.env.DB_PASSWORD || 'system',
      connectionLimit: 5,
      database: 'personal'
    });
  }

  async getTodos(): Promise<Todo[]> {
    let conn: PoolConnection;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query('SELECT id, title FROM todos');
      return rows.slice(0, rows.length);
    } catch (err) {
      throw err;
    } finally {
      if (conn) await conn.end();
    }
  }

  async getTodo(id: number): Promise<Todo> {
    let conn: PoolConnection;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query(
        `SELECT id, title FROM todos WHERE id=${id}`);
      return rows.length > 0 ? rows[0] : undefined;
    } catch (err) {
      throw err;
    } finally {
      if (conn) await conn.end();
    }
  }

  async addTodo(todo: Todo): Promise<Todo> {
    let conn: PoolConnection;
    try {
      conn = await this.pool.getConnection();
      const result = await conn.query(
        `INSERT INTO todos(title) VALUES (?)`,
        [todo.title]
      );
      return {
        ...todo,
        id: result.id
      };
    } catch (err) {
      throw err;
    } finally {
      if (conn) await conn.end();
    }
  }

  async reset(): Promise<any> {
    let conn: PoolConnection;
    try {
      conn = await this.pool.getConnection();
      await conn.query(
        'DELETE FROM todos;'
      );
      await this.addTodo({ title: 'How to Database'})
      await this.addTodo({ title: 'How to Authentication'})
    } catch (err) {
      throw err;
    } finally {
      if (conn) await conn.end();
    }
    return Promise.resolve(undefined);
  }

  async deleteTodo(id: number): Promise<void> {
    let conn: PoolConnection;
    try {
      conn = await this.pool.getConnection();
      await conn.query(
        `DELETE FROM todos WHERE id=${id};`
      );
    } catch (err) {
      throw err;
    } finally {
      if (conn) await conn.end();
    }
    return Promise.resolve(undefined);
  }

}
