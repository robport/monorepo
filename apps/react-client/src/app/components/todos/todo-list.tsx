import React, { useEffect, useState } from 'react';
import { Todos } from '@monorepo/ui';
import { Todo } from '@monorepo/data';
import TodoAdd from './todo-add';
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

  const onDelete = (id: number) => {
    removeError();
    httpDeleteOne('todos', id)
      .catch(e => addError(e.message))
      .then(getAllTodos);
  };

  useEffect(getAllTodos, []);

  return (
    <Wrapper>
      <Todos todos={todos} onDelete={onDelete}/>
      <TodoAdd onAdded={getAllTodos}/>
    </Wrapper>
  );
};

export default TodoList;
