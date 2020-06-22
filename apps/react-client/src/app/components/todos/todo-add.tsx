import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Todo } from '@monorepo/data';
import { httpGet, httpPost, isLoggedIn } from '../../common/http';
import useErrorContext from '../../common/use-error-context';
import styled from 'styled-components';

interface TodoAddProps {
  onAdded: (todo?: Todo) => void;
}

const TodoButton = styled(Button)`
  margin-right: 10px;
`;

const TodoAdd = (props: TodoAddProps) => {
  const [todo, setTodo] = useState<Todo>({
    title: ''
  });

  const { addError, removeError } = useErrorContext();

  const handleChange = (event) => {
    setTodo({
      title: event.target.value
    });
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    if (!todo.title) {
      return;
    }
    try {
      removeError();
      const newTodo = await httpPost('todos', todo);
      props.onAdded(newTodo);
      setTodo({ title: '' });
    } catch (e) {
      addError(e.message);
      console.error(e);
    }
  };

  const handleReset = async () => {
    try {
      removeError();
      await httpGet('todos/reset');
      props.onAdded();
    } catch (e) {
      addError(e.message);
      console.error(e);
    }
  };

  const isAddDisabled = () => {
    return !isLoggedIn() || !todo.title ;
  };

  return (
    <Form onSubmit={handleAdd}>
      <h6>Create a Todo</h6>
      <Form.Group controlId="title">
        <Form.Control type="text"
                      value={todo.title}
                      onChange={handleChange}
                      placeholder="Title"/>
      </Form.Group>

      <TodoButton variant="primary"
                  id="add-todo"
                  disabled={isAddDisabled()}
                  type="submit">
        Add
      </TodoButton>
      <TodoButton variant="outline-secondary"
                  id="reset-todos"
                  disabled={!isLoggedIn()}
                  onClick={handleReset}
                  type="button">
        Reset
      </TodoButton>
    </Form>
  );
};

export default TodoAdd;
