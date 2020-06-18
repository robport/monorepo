import { DynamicModule, Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from '../todos/todo.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TodosService } from '../todos/todos.service';
import { environment } from '../environments/environment';
import { TodosMariaDbService } from '../todos/todos.mariadb.service';
import { MariaDbService } from './maria-db.service';
import { AuthenticationMiddleware } from '../middleware/authentication.middleware';
import { AuthModule } from '../auth/auth.module';

const imports: any[] = [
  AuthModule
];

if (environment.production) {
  imports.push(
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'resume')
    }));
}

@Module({
  imports: imports,
  controllers: [
    AppController,
    TodoController
  ],
  providers: [
    AppService,
    MariaDbService,
    { provide: TodosService, useClass: TodosMariaDbService }
  ]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthenticationMiddleware).forRoutes('todos')
  }
}
