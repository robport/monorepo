import React from 'react';
import { Todo } from '@monorepo/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from 'react-bootstrap/Table';

export const TodosTable = (props: {
  todos: Todo[],
  onDelete: (id: number | string) => void
}) => {

  return (
    <Table bordered hover>
      <thead>
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      {props.todos.map((t) => (
        <tr key={t.id} className={'todo'}>
          <td>{t.id}</td>
          <td>{t.title}</td>
          <td>
            <FontAwesomeIcon
              id={`delete-button-${t.id}`}
              name='delete-button'
              onClick={() => props.onDelete(t.id)}
              icon='trash'/>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
};

export default TodosTable;
