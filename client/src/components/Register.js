import React from "react";
import RegisterForm from "./Forms/RegisterForm";
import AppProvider from "./AppContext";

function Register() {
  return (
    <AppProvider>
      <RegisterForm />
    </AppProvider>
  );
}

export default Register;
