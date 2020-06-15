import React, { useEffect, useState } from 'react';
import { Todos } from '@monoreop-1/ui';
import { Todo } from '@monoreop-1/data';
import './todo.css'

const TodoList = (props: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('/api/todos')
      .then((_) => _.json())
      .then(setTodos);
  }, []);

  return (
    <div className="todo-container">
      <Todos todos={todos}/>
    </div>
  );
};

export default TodoList;
