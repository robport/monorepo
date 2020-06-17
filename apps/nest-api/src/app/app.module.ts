import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from '../todos/todo.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TodosService } from '../todos/todos.service';
import { environment } from '../environments/environment';
import { TodosMariaDbService } from '../todos/todos.mariadb.service';

const imports = [];

if (environment.production) {
  imports.push(
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'resume')
    }));
}

@Module({
  imports: imports,
  controllers: [AppController, TodoController],
  providers: [AppService, {
    provide: TodosService, useClass: TodosMariaDbService
  }]
})
export class AppModule {
}
