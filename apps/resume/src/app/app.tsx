import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoAdd from './components/todos/todo-add';
import TodoList from './components/todos/todo-list';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import AlertAnimation from './components/animation/alert';

const App = () => {
  return (
    <Router>
      <Navbar bg="light" expand="sm">
        <LinkContainer to="/">
          <Navbar.Brand>Demo</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Todos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/animate">
              <Nav.Link>Animate</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path="/animate">
          <AlertAnimation/>
        </Route>
        <Route path="/">
          <TodoList/>
        </Route>

      </Switch>
    </Router>

  );
};

export default App;
