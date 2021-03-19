import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../AppContext";
const RegisterForm = () => {
  const {
    setEmail,
    setPassword,
    handleSubmitReg,
    handleErrorReg,
    setName,
    registerAlert,
  } = useContext(AppContext);

  return (
    <>
      <form className="col-4 offset-4" onSubmit={handleSubmitReg}>
        <h1 style={{ paddingTop: "100px", paddingBottom: "10px" }}>Register</h1>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-4 col-form-label ">
            Name
          </label>
          <div className="col-8">
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-4 col-form-label ">
            Email
          </label>
          <div className="col-8">
            <input
              className="form-control"
              // type="email"
              id="email"
              name="email"
              placeholder="E-mail"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div>{handleErrorReg("email")}</div>
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
            {handleErrorReg("password")}
            {registerAlert()}
          </div>
        </div>

        <button
          style={{ marginTop: "10px" }}
          className="btn btn-success "
          type="submit"
        >
          Register
        </button>
      </form>
      <div>
        <NavLink to="/login">Login</NavLink>
      </div>
      <div>
        <NavLink to="/todolist">To do list</NavLink>
      </div>
    </>
  );
};

export default RegisterForm;
