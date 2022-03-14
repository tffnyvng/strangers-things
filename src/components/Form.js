import React, { useState, useEffect } from "react";
import { useAuth } from "../custom-hooks";

//this form is for logging in and out/ registering user

export default function Form() {
  const { updateAuthStatus } = useAuth();

  const [form, setForm] = useState({ username: "jane", password: "123" });

  // useEffect (() => {}, []), not in use rn

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://strangers-things.herokuapp.com/api/2022-FTB-PT-WEB-FT/users/login`,
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
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="submit" value="Login" />
    </form>
  );
}
