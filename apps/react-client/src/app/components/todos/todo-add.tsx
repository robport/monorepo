import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Todo } from '@monorepo/data';
import './todo.css';

interface TodoAddProps {
  onAdded: (todo?: Todo) => void;
}

class TodoAdd extends React.Component<TodoAddProps, Todo> {
  state: Todo = {
    title: ''
  };

  constructor(props: TodoAddProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      });
      const newTodo = await result.json();
      this.props.onAdded(newTodo);
      this.setState({ title: '' });
    } catch (e) {
      console.error(e);
    }
  }

  async handleReset() {
    try {
      await fetch('api/todos/reset');
      this.props.onAdded();
    } catch (e) {
      // todo - error alert
      console.error(e);
    }
  }

  render() {
    return (
      <div className="todo-container">
        <Form onSubmit={this.handleSubmit}>
          <h6>Create a Todo</h6>
          <Form.Group controlId="title">
            <Form.Control type="text"
                          value={this.state.title}
                          onChange={this.handleChange}
                          placeholder="Title"/>
          </Form.Group>

          <Button variant="primary"
                  id="add-todo"
                  className="todo-button"
                  type="submit">
            Add
          </Button>
          <Button variant="secondary"
                  id="reset-todos"
                  onClick={this.handleReset}
                  type="button">
            Reset
          </Button>
        </Form>
      </div>
    );
  }
}

export default TodoAdd;
