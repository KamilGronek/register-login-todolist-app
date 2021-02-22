import React from "react";
import { NavLink } from "react-router-dom";

function LoginForm(props) {
  return (
    <>
      <form className="col-4 offset-4" onSubmit={props.handleSubmit}>
        <h1 style={{ paddingTop: "100px", paddingBottom: "10px" }}>Login</h1>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-4 col-form-label ">
            Email
          </label>
          <div className="col-8">
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
              required
              onChange={(e) => {
                props.setEmail(e.target.value);
              }}
            />
            {props.handleError("email")}
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-4 col-form-label">
            Password
          </label>
          <div className="col-8">
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => {
                props.setPassword(e.target.value);
              }}
            />
            {props.handleError("password")}
            {props.loginAlert()}
            {props.handleError("main")}
          </div>
        </div>

        <button
          style={{ marginTop: "10px" }}
          className="btn btn-success "
          type="submit"
        >
          Login
        </button>
      </form>
      <div>
        <NavLink to="/register">Register</NavLink>
      </div>
      <div>
        <NavLink to="/todolist">To do list</NavLink>
      </div>
    </>
  );
}

export default LoginForm;
