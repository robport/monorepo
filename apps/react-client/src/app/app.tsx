import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoList from './components/todos/todo-list';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import AlertAnimation from './components/animation/alert';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { httpLogout, isLoggedIn } from './common/http';
import Login from './components/auth/login';
import ErrorProvider from './common/error-provider';
import ErrorBar from './components/error-bar/error-bar';
import useErrorContext from './common/use-error-context';
import WebSockets from './components/websockets/webSockets';

library.add(faTrash);


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [, setState] = useState();
  const { addError, removeError } = useErrorContext();

  const handleClose = () => setShowLogin(false);
  const handleShow = () => setShowLogin(true);
  const handleLogout = async () => {
    try {
      removeError();
      await httpLogout();
    } catch (e) {
      addError(e);
    }
    setState({});
  };

  return (
    <ErrorProvider>
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
              <LinkContainer to="/websockets">
                <Nav.Link>Websockets</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              {
                isLoggedIn() &&
                <Nav.Link id="logout-link"
                          onClick={handleLogout}>Logout</Nav.Link>
              }
              {
                !isLoggedIn() &&
                <Nav.Link id="openLogin"
                          onClick={handleShow}>Login</Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Login show={showLogin} onClose={handleClose}/>
        <ErrorBar/>

        <Switch>
          <Route path="/animate">
            <AlertAnimation/>
          </Route>
          <Route path="/websockets">
            <WebSockets/>
          </Route>
          <Route path="/">
            <TodoList/>
          </Route>

        </Switch>
      </Router>
    </ErrorProvider>

  );
};

export default App;
