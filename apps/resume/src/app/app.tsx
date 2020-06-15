import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AddTodo from './components/add-todo';
import TodoList from './components/todo-list';

const App = () => {
  return (
    <div>
      <h1>Todos</h1>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">List</Link>
              </li>
              <li>
                <Link to="/add">Add</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route id='addBtn' path="/add">
              <AddTodo/>
            </Route>
            <Route path="/">
              <TodoList/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>

  );
};

export default App;
