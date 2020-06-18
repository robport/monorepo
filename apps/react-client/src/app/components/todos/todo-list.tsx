import React, { useEffect, useState } from 'react';
import { Todos } from '@monorepo/ui';
import { Todo } from '@monorepo/data';
import './todo.css';
import TodoAdd from './todo-add';
import { httpDeleteOne, httpGet } from '../../common/http';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getAllTodos = () => {
    httpGet('todos').then(setTodos);
  };

  const onDelete = (id: number) => {
    httpDeleteOne('todos', id).then(getAllTodos);
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
