import React, { useState } from "react";
import RegisterForm from "./Forms/RegisterForm";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState([]);
  const [alertRegister, setAlertRegister] = useState(false);

  const handleSubmit = (e) => {
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
          setError(res.validationResult.errors);
        });
      }
      setAlertRegister(false);
    });
    setError([]);
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

  const handleError = (field) => {
    return errors
      .filter((error) => error.field === field)
      .map((error) => <span style={{ color: "red" }}>{error.message}</span>);
  };
  return (
    <RegisterForm
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      handleError={handleError}
      registerAlert={registerAlert}
    />
  );
}

export default Register;
