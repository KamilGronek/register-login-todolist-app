import React from "react";
import { NavLink } from "react-router-dom";

function ToDoListForm(props) {
  return (
    <>
      <form className="col-4 offset-4" onSubmit={props.handleSubmit}>
        <h1 style={{ paddingTop: "100px", paddingBottom: "10px" }}>
          To do list
        </h1>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-4 col-form-label ">
            Text task
          </label>
          <div className="col-8">
            <input
              className="form-control"
              type="text"
              id="text"
              name="text"
              placeholder="Add task"
              onChange={(e) => {
                props.setText(e.target.value);
              }}
              value={props.text}
            />
            {props.handleError()}
          </div>
        </div>
        <button
          style={{ marginTop: "10px", marginBottom: "10px" }}
          className="btn btn-success "
          type="submit"
        >
          Add
        </button>
      </form>
      {props.showList()}
      <div>
        <NavLink to="/register">Register</NavLink>
      </div>
      <div>
        <NavLink to="/login">Login</NavLink>
      </div>
    </>
  );
}

export default ToDoListForm;
