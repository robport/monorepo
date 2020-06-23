import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway( )
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('EventsGateway');

  afterInit(server: Server): any {
    this.logger.log('Events Gateway Initialised (SocketIO)');
  }

  handleConnection(client: Socket): any {
    this.logger.log(`Client Connected ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Client Disconnected ${client.id}`);
  }

  @SubscribeMessage('events')
  onEvent(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    client.broadcast.emit('events', {
      data: 'Message from ' + client.id + ': ' + data.data
    });

    return {
      event: 'events',
      data: {
        data: 'Pong'
      }
    };
  }

}
