import React, { useState } from "react";

import LoginForm from "./Forms/LoginForm";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState([]);
  const [alertLogin, setAlertLogin] = useState(false);

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
          setError(res.validationResult.errors);
        });
      }
      setAlertLogin(false);
    });
    setError([]);
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
  return (
    <LoginForm
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      handleError={handleError}
      loginAlert={loginAlert}
    />
  );
}

export default Login;
