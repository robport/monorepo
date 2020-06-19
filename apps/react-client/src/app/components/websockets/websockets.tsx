import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client';


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
  const [status, setStatus] = useState('New');
  const webSocket = useRef<SocketIOClient.Socket>(null);

  useEffect(() => {
    webSocket.current = io('http://localhost:3333');

    webSocket.current.on('events', (message: any) => {
      setMessages(prev => [...prev, new Message(message.data)]);
    });

    webSocket.current.on('message', (message: any) => {
      setMessages(prev => [...prev, new Message(message)]);
    });

    webSocket.current.on('connect', () => {
      setStatus(('Connected'))
    });

    webSocket.current.on('error', err => {
      setStatus(('Error:' + err))
    });

    webSocket.current.on('disconnect', () => {
      setStatus(('Disconnected'))
    });

    return () => webSocket.current.close();
  }, []);

  const sendMessage = () => {
    webSocket.current.emit('events', { data: 'Hello' }, data => {
      setMessages(prev => [...prev, new Message(data.data)]);
    });
  };

  return (
    <div>
      <h4>Websockets Socket IO Implementation</h4>
      <p>Status: {status}</p>
      {
        messages.map(message => (
          <p key={message.id}>{message.message}</p>
        ))
      }
      <Button type="button" onClick={sendMessage}>
        SEND
      </Button>
    </div>
  );
};

export default Websockets;
