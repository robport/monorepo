import React, { useEffect, useState } from 'react';
import { TodosTable } from '@monorepo/ui';
import { Todo } from '@monorepo/data';
import TodoForm from './todo-form';
import { httpDeleteOne, httpGet } from '../../common/http';
import useErrorContext from '../../common/use-error-context';
import { Wrapper } from '../../common/atom';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { addError, removeError } = useErrorContext();

  const getAllTodos = () => {
    httpGet('todos')
      .catch(e => addError(e.message))
      .then(setTodos);
  };

  const onDelete = (id: number | string) => {
    removeError();
    httpDeleteOne('todos', id)
      .catch(e => addError(e.message))
      .then(getAllTodos);
  };

  useEffect(getAllTodos, []);

  return (
    <Wrapper>
      <TodosTable todos={todos} onDelete={onDelete}/>
      <TodoForm onAdded={getAllTodos}/>
    </Wrapper>
  );
};

export default TodoList;
