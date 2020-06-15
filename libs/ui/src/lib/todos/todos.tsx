import React from 'react';
import { Todo } from '@monoreop-1/data';

export const Todos = (props: { todos: Todo[] }) => {
  return (
    <ul>
      {props.todos.map((t) => (
        <li key={t.id} className={'todo'}>{t.title} ({t.id})</li>
      ))}
    </ul>
  );
};

export default Todos;
