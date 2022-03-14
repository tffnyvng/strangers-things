import React, { useState } from "react";
import { useAuth } from "../custom-hooks";
import { useLocation, useHistory } from "react-router-dom";

const LoginOrRegister = () => {
  const { updateAuthStatus } = useAuth();
  const { pathname } = useLocation();
  const history = useHistory();

  const loginOrRegister = pathname.slice(1);
  // console.log(pathname);

  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://strangers-things.herokuapp.com/api/2022-FTB-PT-WEB-FT/users/${loginOrRegister}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: form }),
        }
      );

      const { success, error, data } = await response.json();

      if (success) {
        localStorage.st_token = data.token;
        updateAuthStatus();
      } else {
        throw new Error(
          `error ${
            loginOrRegister === "login" ? "logging" : "registering"
          } user`
        );
      }
      history.push("/home");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="formField">
        <label>{loginOrRegister === "register" && "Choose "}Username: </label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
      </div>
      <div className="formField">
        <label>{loginOrRegister === "register" && "Choose "}Password: </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        value={loginOrRegister === "register" ? "Sign Up" : "Login"}
      />
    </form>
  );
};

export default LoginOrRegister;
