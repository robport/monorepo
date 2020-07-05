import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { environment } from '../environments/environment';
import { EventsGateway } from './events.gateway';
import { TodoController } from '../todos/todo.controller';
import { MariaDbService } from '../db/maria-db.service';
import { AuthModule } from '../auth/auth.module';
import { TodosService } from '../todos/todos.service';
import { TodosMariaDbService } from '../todos/todos.mariadb.service';
import { ToolsController } from '../tools/toolsController';
import { AuctionModule } from '../auction/auction.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DbModule } from '../db/db.module';

const imports: any[] = [
  DbModule,
  AuthModule,
  AuctionModule,
  ScheduleModule.forRoot()
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
    { provide: TodosService, useClass: TodosMariaDbService }
  ],
  exports: [
  ]
})
export class AppModule {
}
