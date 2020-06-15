import React from 'react';
import { Redirect } from 'react-router-dom';

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
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text"
                 id="title"
                 value={this.state.value.title}
                 onChange={this.handleChange}/>
        </label>
        <input id="add-todo"
               type="submit"
               value="Submit"/>
      </form>
    );
  }
}

export default AddTodo;
