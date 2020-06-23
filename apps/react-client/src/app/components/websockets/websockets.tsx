import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client';
import useErrorContext from '../../common/use-error-context';
import { environment } from '../../../environments/environment';
import { Title, Wrapper } from '../../common/atom';

export class Message {
  id: string;
  message: string;

  constructor(message: string) {
    this.id = new Date().getTime().toString();
    this.message = message;
  }
}

const Websockets = (props: any) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('Connecting...');
  const webSocket = useRef<SocketIOClient.Socket>(null);
  const { addError, removeError } = useErrorContext();

  useEffect(() => {
    removeError();
    webSocket.current = io(environment.websocketUrl);

    webSocket.current.on('events', (message: any) => {
      setMessages(prev => [...prev, new Message(message.data)]);
    });

    webSocket.current.on('message', (message: any) => {
      setMessages(prev => [...prev, new Message(message)]);
    });

    webSocket.current.on('connect', () => {
      setStatus(('Connected'));
    });

    webSocket.current.on('error', err => {
      console.log('error?');
      setStatus(('Error:' + err));
    });

    webSocket.current.on('disconnect', () => {
      setStatus(('Disconnected'));
    });

    webSocket.current.on('connect_failed', () => {
      setStatus(('Connection Failed'));
      addError('Connection Failed');
    });

    webSocket.current.on('connect_error', () => {
      setStatus(('Connection error, retrying...'));
      addError('Connection Error');
    });


    return () => webSocket.current.close();
  }, []);

  const sendMessage = () => {
    webSocket.current.emit('events', { data: 'Ping' }, data => {
      setMessages(prev => [...prev, new Message(data.data)]);
    });
  };

  return (
    <Wrapper>
      <Title>Websockets Socket IO Implementation</Title>
      <p>Host: {environment.websocketUrl}</p>
      <p>Status: {status}</p>
      {
        messages.map(message => (
          <p key={message.id}>{message.message}</p>
        ))
      }
      <Button type="button" onClick={sendMessage}>
        PING
      </Button>
    </Wrapper>
  );
};

export default Websockets;
