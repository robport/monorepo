import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoList from './components/todos/todo-list';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { httpLogout, isLoggedIn } from './common/http';
import LoginDialog from './components/auth/login-dialog';
import ErrorProvider from './common/error-provider';
import ErrorBar from './components/error-bar/error-bar';
import useErrorContext from './common/use-error-context';
import Tools from './components/tools/tools';
import Websockets from './components/websockets/websockets';
import FourOFour from './components/four-o-four/four-o-four';
import Home from './components/home/home';
import About from './components/about/about';
import RegisterDialog from './components/auth/register-dialog';
import AuctionList from './components/auction/auction-list';
import AuctionBids from './components/auction/auction-bids';

library.add(faTrash);

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [, setState] = useState();
  const { addError, removeError } = useErrorContext();

  const handleClose = () => {
    setShowRegister(false);
    setShowLogin(false);
  };
  const handleShowLogin = () => setShowLogin(true);
  const handleShowRegister = () => setShowRegister(true);

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
        <Navbar fixed="top" bg="light" expand="sm">
          <LinkContainer to="/">
            <Navbar.Brand>Home</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/stack">
                <Nav.Link>My Stack</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/todos">
                <Nav.Link>Todos</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/auctions">
                <Nav.Link>Auctions</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/websockets">
                <Nav.Link>Websockets</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              {
                isLoggedIn() &&
                <Nav.Link id="logout-nav"
                          onClick={handleLogout}>Logout</Nav.Link>
              }
              {
                !isLoggedIn() &&
                <Nav.Link id="login-nav" onClick={handleShowLogin}>Login</Nav.Link>
              }
              {
                !isLoggedIn() &&
                <Nav.Link id="register-nav" onClick={handleShowRegister}>Register</Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <LoginDialog show={showLogin} onClose={handleClose}/>
        <RegisterDialog show={showRegister} onClose={handleClose}/>
        <ErrorBar/>

        <Switch>
          <Route path="/websockets" component={Websockets}/>
          <Route path="/auctions/:id" component={AuctionBids}/>
          <Route path="/auctions" component={AuctionList}/>
          <Route path="/todos" component={TodoList}/>
          <Route path="/stack" component={Tools}/>
          <Route path="/about" component={About}/>
          <Route path="/home" component={Home}/>
          <Route exact path="/" component={Home}/>
          <Route>
            <FourOFour location={location}/>
          </Route>
        </Switch>
      </Router>
    </ErrorProvider>

  );
};

export default App;
