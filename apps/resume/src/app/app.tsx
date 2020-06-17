import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoList from './components/todos/todo-list';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import AlertAnimation from './components/animation/alert';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);


const App = () => {
  return (
    <Router>
      <Navbar bg="light" expand="sm">
        <LinkContainer to="/">
          <Navbar.Brand>Porter</Navbar.Brand>
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
