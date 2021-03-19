const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo",
  multipleStatements: true,
});

db.connect((err) => {
  if (!err) {
    console.log("Success");
  } else {
    console.log("Failed");
  }
});

app.listen(80, function () {
  console.log("Listening!");
});

const validationResult = {
  errors: [],
};

const regexEmail = /\S+@\S+\.\S+/;

const errorUniqueEmail = {
  code: "email.unique",
  field: "email",
  message: "Email exists",
};

const uniqValidEmail = {
  code: "email.valid",
  field: "email",
  message: "Email is invalid",
};

const errorUserNotFound = {
  code: "user.not-found",
  field: "main",
  message: "User not found",
};

const errorTodoNotFound = {
  code: "todo.not-found",
  field: "main",
  message: "Todo not found",
};

const errorNotBlank = {
  code: "text.valid",
  field: "text",
  message: "Input cannot be empty",
};

returnResponseCreated = (res) => {
  res.status(201);
  res.json();
};

returnResponseOk = (res) => {
  res.status(200);
  res.json();
};

returnResponseNoContent = (res) => {
  res.status(204);
  res.json();
};

returnResponseError = (res) => {
  res.status(400);
  res.json({
    validationResult: validationResult,
  });
};

validationRegister = (req) => {
  validationResult.errors = [];

  if (!regexEmail.test(req.body.email)) {
    validationResult.errors.push(uniqValidEmail);
  }
};

saveUser = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  checkUserByEmailAndSave(req.body.email, (result) => {
    if (result.length !== 0) {
      validationResult.errors.push(errorUniqueEmail);
      returnResponseError(res);
    } else {
      db.query(
        "INSERT INTO user (name, email, password) VALUES (?,?,?)",
        [name, email, password],
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          }

          returnResponseCreated(res);
        }
      );
    }
  });
};

returnResponseRegister = (req, res) => {
  if (validationResult.errors.length === 0) {
    saveUser(req, res);
  } else {
    res.status(400);
    res.json({
      validationResult: validationResult,
    });
  }
};

app.post("/register", function (req, res, next) {
  validationRegister(req);
  returnResponseRegister(req, res);
});

login = (req, res) => {
  validationResult.errors = [];
  getUserByEmailAndPassword(req.body.email, req.body.password, (result) => {
    if (result.length === 0) {
      validationResult.errors.push(errorUserNotFound);
      returnResponseError(res);
    } else {
      returnResponseOk(res);
    }
  });
};

getUserByEmailAndPassword = (email, password, callBackResponse) => {
  db.query(
    "SELECT * FROM user WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      callBackResponse(result);
    }
  );
};

app.post("/login", function (req, res, next) {
  login(req, res);
});

//===================================TODO===============================================
validationTodoList = (req) => {
  validationResult.errors = [];
  if (req.body.text.length === 0 || !req.body.text.trim()) {
    validationResult.errors.push(errorNotBlank);
  }
};

returnResponseTodoListCreate = (res, callBackCreateTodo) => {
  if (validationResult.errors.length === 0) {
    callBackCreateTodo();
  } else {
    res.status(400);
    res.json({
      validationResult: validationResult,
    });
  }
};

createTodo = (text, res) => {
  db.query("INSERT INTO todo (text) VALUES (?)", [text], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    returnResponseCreated(res);
  });
};

app.post("/todolist", (req, res, next) => {
  validationTodoList(req);
  returnResponseTodoListCreate(res, () => {
    createTodo(req.body.text, res);
  });
});

returnResponseTodoListUpdate = (req, res) => {
  if (validationResult.errors.length === 0) {
    updateTodo(req, res);
  } else {
    res.status(400);
    res.json({
      validationResult: validationResult,
    });
  }
};

checkUserByEmailAndSave = (email, callBackSave) => {
  db.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
      return null;
    }

    callBackSave(result);
  });
};

returnTodos = (res) => {
  db.query("SELECT * FROM todo", (err, result) => {
    if (err) {
      console.log(err);
      return null;
    }

    res.status(200);
    res.json(result);
  });
};

app.get("/todolist", (req, res, next) => {
  returnTodos(res);
});

updateTodo = (req, res) => {
  const { id } = req.params;
  checkTodoAndCallBack(id, (result) => {
    if (result.length === 0) {
      validationResult.errors.push(errorTodoNotFound);
      returnResponseError(res);
    } else {
      db.query(
        "UPDATE todo set text = ? where id = ?",
        [req.body.text, id],
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          }

          returnResponseOk(res);
        }
      );
    }
  });
};

checkTodoAndCallBack = (id, callBackDelete) => {
  db.query("SELECT * FROM todo WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
      return null;
    }

    callBackDelete(result);
  });
};

app.put("/todolist/:id", (req, res, next) => {
  validationTodoList(req);
  returnResponseTodoListUpdate(req, res);
});

deleteTodo = (req, res) => {
  const { id } = req.params;
  checkTodoAndCallBack(id, (result) => {
    if (result.length === 0) {
      validationResult.errors.push(errorTodoNotFound);
      returnResponseError(res);
    } else {
      db.query("DELETE FROM todo where id = ?", [id], (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        returnResponseNoContent(res);
      });
    }
  });
};

app.delete("/todolist/:id", (req, res, next) => {
  deleteTodo(req, res);
});
