import React from "react";
import LoginForm from "./Forms/LoginForm";
import AppProvider from "./AppContext";

function Login() {
  return (
    <AppProvider>
      <LoginForm />
    </AppProvider>
  );
}

export default Login;
