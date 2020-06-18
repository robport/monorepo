import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Todo } from '@monorepo/data';
import './todo.css';
import { httpGet, httpPost } from '../../common/http';

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
    this.handleAdd = this.handleAdd.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  async handleAdd(event) {
    event.preventDefault();
    try {
      const newTodo = await httpPost('todos', this.state);
      this.props.onAdded(newTodo);
      this.setState({ title: '' });
    } catch (e) {
      console.error(e);
    }
  }

  async handleReset() {
    try {
      await httpGet('todos/reset');
      this.props.onAdded();
    } catch (e) {
      // todo - error alert
      console.error(e);
    }
  }

  render() {
    return (
      <div className="todo-container">
        <Form onSubmit={this.handleAdd}>
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
          <Button variant="outline-secondary"
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
