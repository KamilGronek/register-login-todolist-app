import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../AppContext";

const LoginForm = () => {
  const {
    setEmail,
    setPassword,
    handleSubmit,
    handleError,
    loginAlert,
  } = useContext(AppContext);

  return (
    <>
      <form className="col-4 offset-4" onSubmit={handleSubmit}>
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
                setEmail(e.target.value);
              }}
            />
            {handleError("email")}
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
                setPassword(e.target.value);
              }}
            />
            {handleError("password")}
            {loginAlert()}
            {handleError("main")}
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
};

export default LoginForm;
