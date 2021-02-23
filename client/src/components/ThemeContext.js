import React, { useContext, useState } from "react";

const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ThemeContext.Provider
      value={(name, email, password, setName, setEmail, setPassword)}
    >
      {children}
    </ThemeContext.Provider>
  );
}
