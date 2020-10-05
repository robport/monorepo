import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { environment } from '../environments/environment';
import { EventsGateway } from './events.gateway';
import { TodoController } from '../todos/todo.controller';
import { AuthModule } from '../auth/auth.module';
import { TodosService } from '../todos/todos.service';
import { TodosMariaDbService } from '../todos/todos.mariadb.service';
import { ToolsController } from '../tools/toolsController';
import { AuctionModule } from '../auction/auction.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DbModule } from '../db/db.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { TodosMongoDbService } from '../todos/todos-mongo-db.service';

const imports: any[] = [
  DbModule,
  AuthModule,
  AuctionModule,
  ScheduleModule.forRoot(),
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      AUTH_SECRET: Joi.string().required(),
      MARIA_DB_URL: Joi.string().required(),
      PORT: Joi.number().required(),
    }),
    validationOptions: {
      abortEarly: false
    }
  })
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
    { provide: TodosService, useClass: TodosMongoDbService }
  ],
  exports: []
})
export class AppModule {
}
