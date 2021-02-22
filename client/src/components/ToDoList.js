import React, { useState, useEffect } from "react";
import ToDoListForm from "./Forms/ToDoListForm";
import ToDoShowList from "./ToDoShowList";
function TodoList() {
  const [text, setText] = useState("");
  const [tab, setTab] = useState([]);
  const [errors, setErrors] = useState([]);
  const [editable, setEditable] = useState(false);
  const [editableId, setEditableId] = useState(null);

  const handleSubmit = (e) => {
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

  const handleError = () => {
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
    <ToDoListForm
      handleSubmit={handleSubmit}
      handleError={handleError}
      text={text}
      showList={showList}
      setText={setText}
    />
  );
}

export default TodoList;
