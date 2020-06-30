import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { environment } from '../environments/environment';
import { EventsGateway } from './events.gateway';
import { TodoController } from '../todos/todo.controller';
import { MariaDbService } from './maria-db.service';
import { AuthModule } from '../auth/auth.module';
import { TodosService } from '../todos/todos.service';
import { TodosMariaDbService } from '../todos/todos.mariadb.service';
import { ToolsController } from '../tools/toolsController';

const imports: any[] = [
  AuthModule
];

if (environment.production) {
  imports.push(
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'react-client')
    }));
}

@Module({
  imports: imports,
  controllers: [
    TodoController,
    ToolsController
  ],
  providers: [
    EventsGateway,
    MariaDbService,
    { provide: TodosService, useClass: TodosMariaDbService }
  ]
})
export class AppModule {
}
