import React, { useState, useEffect } from "react";
import { useAuth } from "../custom-hooks";

//this form is for registering user

export default function Form() {
  const { updateAuthStatus } = useAuth();

  const [form, setForm] = useState({ username: "", password: "" });

  // useEffect (() => {}, []), not in use rn
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://strangers-things.herokuapp.com/api/2022-FTB-PT-WEB-FT/users/register`,
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
        throw new Error("error registering user");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="formField">
        <label>Username: </label>
        <input
          type="username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
      </div>
      <div className="formField">
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <input type="submit" value="Register" />
    </form>
  );
}
