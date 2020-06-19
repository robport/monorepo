import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Todo } from '@monorepo/data';
import './todo.css';
import { httpGet, httpPost } from '../../common/http';
import useErrorContext from '../../common/use-error-context';

interface TodoAddProps {
  onAdded: (todo?: Todo) => void;
}

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
    if ( !todo.title ) {
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

  return (
    <div className="todo-container">
      <Form onSubmit={handleAdd}>
        <h6>Create a Todo</h6>
        <Form.Group controlId="title">
          <Form.Control type="text"
                        value={todo.title}
                        onChange={handleChange}
                        placeholder="Title"/>
        </Form.Group>

        <Button variant="primary"
                id="add-todo"
                className="todo-button"
                type="submit">
          Add
        </Button>
        <Button variant="outline-secondary"
                id="reset-todos"
                onClick={handleReset}
                type="button">
          Reset
        </Button>
      </Form>
    </div>
  );
};

export default TodoAdd;
