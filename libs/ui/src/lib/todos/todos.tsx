import React from 'react';
import { Todo } from '@monoreop-1/data';
import Table from 'react-bootstrap/Table';


export const Todos = (props: { todos: Todo[] }) => {
  return (

    <Table striped bordered hover>
      <thead>
      <tr>
        <th>Id</th>
        <th>Title</th>
      </tr>
      </thead>
      <tbody>
      {props.todos.map((t) => (
        <tr key={t.id} className={'todo'}>
          <td>{t.id}</td>
          <td>{t.title}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
};

export default Todos;
