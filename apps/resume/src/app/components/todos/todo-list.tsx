import React, { useEffect, useState } from 'react';
import { Todos } from '@monorepo/ui';
import { Todo } from '@monorepo/data';
import './todo.css';
import TodoAdd from './todo-add';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getAllTodos = () => {
    fetch('/api/todos')
      .then((_) => _.json())
      .then(setTodos);
  };

  const onDelete = (id: number) => {
    fetch(`/api/todos/delete/${id}`, {
      method: 'DELETE'
    }).then(getAllTodos);
  };

  useEffect(getAllTodos, []);

  return (
    <div className="todo-container">
      <Todos todos={todos} onDelete={onDelete}/>
      <TodoAdd onAdded={getAllTodos}/>
    </div>
  );
};

export default TodoList;
