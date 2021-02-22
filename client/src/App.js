import React, { Component } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import ToDoList from "./components/ToDoList";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const Menu = () => {
    return (
      <div style={{ marginTop: "30px" }}>
        <div>
          <NavLink to="/register">Register</NavLink>
        </div>
        <div>
          <NavLink to="/login">Login</NavLink>
        </div>
        <div>
          <NavLink to="/todolist">To do list</NavLink>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Menu} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/todolist" render={() => <ToDoList />} />
      </Router>
    </div>
  );
}

export default App;
