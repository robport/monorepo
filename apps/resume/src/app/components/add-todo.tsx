import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class AddTodo extends React.Component {
  state = {
    value: {
      title: ''
    },
    redirect: false
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: {
        title: event.target.value
      },
      redirect: false
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
        body: JSON.stringify(this.state.value)
      });
      const newTodo = await result.json();

      this.setState({
        redirect: true
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to='/list'/>);
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text"
                        value={this.state.value.title}
                        onChange={this.handleChange}
                        placeholder="Title"/>
        </Form.Group>

        <Button variant="primary"
                id="add-todo"
                type="submit">
          Add
        </Button>
      </Form>
    );
  }
}

export default AddTodo;
