import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../custom-hooks";

const Message = (props) => {
  const { _id } = props;
  const history = useHistory();
  const { token } = useAuth();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://strangers-things.herokuapp.com/api/2202-FTB-WEB-FT/posts/${_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: form }),
        }
      );
      const {
        data: { post },
      } = await response.json();
      console.log(post);
      // here's where we can use history.push('/wherever')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formField">
        <label>Title: </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </div>
      <div className="formField">
        <label>Content: </label>
        <input
          type="text"
          name="content"
          value={form.content}
          onChange={handleChange}
        />
      </div>
      <input type="submit" value="Register" />
    </form>
  );
};

export default Message;
