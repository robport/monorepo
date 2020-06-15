import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoAdd from './components/todo-add';
import TodoList from './components/todo-list';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const App = () => {
  return (
    <Router>
      <Navbar bg="light" expand="sm">
        <LinkContainer to="/">
          <Navbar.Brand>Todo</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add">
              <Nav.Link>Add</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route id='addBtn' path="/add">
          <TodoAdd/>
        </Route>
        <Route path="/">
          <TodoList/>
        </Route>
      </Switch>
    </Router>

  );
};

export default App;
