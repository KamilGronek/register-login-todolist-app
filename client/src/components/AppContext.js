import React, { createContext, useState, useEffect } from "react";
import ToDoShowList from "./ToDoShowList";
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const [alertLogin, setAlertLogin] = useState(false);
  const [name, setName] = useState("");
  const [alertRegister, setAlertRegister] = useState(false);

  const [text, setText] = useState("");
  const [tab, setTab] = useState([]);
  const [editable, setEditable] = useState(false);
  const [editableId, setEditableId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let json = JSON.stringify({
      email: email,
      password: password,
    });
    fetch("http://localhost:8000/login", {
      method: "post",

      body: json,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then((response) => {
      if (response.ok) {
        setAlertLogin(true);
        return;
      }
      if (response.status === 400) {
        setAlertLogin(false);
        return response.json().then((res) => {
          setErrors(res.validationResult.errors);
        });
      }
      setAlertLogin(false);
    });
    setErrors([]);
  };

  const loginAlert = () => {
    return (
      <>
        {alertLogin ? (
          <span style={{ color: "green" }}>You're logged in!</span>
        ) : (
          ""
        )}
      </>
    );
  };

  const handleError = (field) => {
    return errors
      .filter((error) => error.field === field)
      .map((error) => <span style={{ color: "red" }}>{error.message}</span>);
  };

  //========================================================

  const handleSubmitReg = (e) => {
    e.preventDefault();
    let json = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });
    fetch("http://localhost:8000/register", {
      method: "post",
      body: json,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then((response) => {
      if (response.ok) {
        setAlertRegister(true);
        return;
      }
      if (response.status === 400) {
        setAlertRegister(false);
        return response.json().then((res) => {
          setErrors(res.validationResult.errors);
        });
      }
      setAlertRegister(false);
    });
    setErrors([]);
  };

  const registerAlert = () => {
    return (
      <>
        {alertRegister ? (
          <span style={{ color: "green" }}>You're registered!</span>
        ) : (
          ""
        )}
      </>
    );
  };

  const handleErrorReg = (field) => {
    return errors
      .filter((error) => error.field === field)
      .map((error) => <span style={{ color: "red" }}>{error.message}</span>);
  };

  //==========================================================

  const handleSubmitToDoList = (e) => {
    e.preventDefault();
    let json = JSON.stringify({
      text: text,
    });
    fetch("http://localhost:8000/todolist", {
      method: "post",
      body: json,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then((response) => {
      if (response.ok) {
        getList();
      }
      if (response.status === 400) {
        return response.json().then((res) => {
          setErrors(res.validationResult.errors);
        });
      }
    });
    setText("");
    setErrors([]);
  };

  const handleErrorToDoList = () => {
    return errors
      .filter((error) => error.field === "text")
      .map((error) => <span style={{ color: "red" }}>{error.message}</span>);
  };

  const getList = () => {
    fetch("http://localhost:8000/todolist", {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json().then((res) => {
          setTab(res);
        });
      }
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/todolist/${id}`, {
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then((response) => {
      if (response.status === 204) {
        getList();
      }
    });
  };

  const handleEdit = (id, text) => {
    let json = JSON.stringify({
      text: text,
    });
    fetch(`http://localhost:8000/todolist/${id}`, {
      method: "put",
      body: json,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then((response) => {
      if (response.status === 200) {
        getList();
      }
    });
    editMode(id);
  };

  const editMode = (id) => {
    setEditable(editableId === id ? !editable : true);
    setEditableId(id);
  };

  const handleValue = (e, id) => {
    let updatedList = tab.map((todo) => {
      if (todo.id === id) {
        const updatedItem = {
          ...todo,
          text: e.target.value,
        };
        return updatedItem;
      }
      return todo;
    });
    setTab(updatedList);
  };

  const showList = () => {
    return (
      <ToDoShowList
        editMode={editMode}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleValue={handleValue}
        tab={tab}
        editable={editable}
        editableId={editableId}
      />
    );
  };

  return (
    <AppContext.Provider
      value={{
        setEmail,
        setPassword,
        handleSubmit,
        handleError,
        loginAlert,
        handleSubmitReg,
        handleErrorReg,
        setName,
        registerAlert,
        handleSubmitToDoList,
        handleErrorToDoList,
        setText,
        text,
        showList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
