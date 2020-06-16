import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from '../todo/todo.controller';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'resume'),
    }),
  ],
  controllers: [AppController, TodoController],
  providers: [AppService],
})
export class AppModule {}
