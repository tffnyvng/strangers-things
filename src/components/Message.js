import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../custom-hooks";

const Message = () => {
  const { _id } = useParams();
  const history = useHistory();
  const { token } = useAuth();

  const [form, setForm] = useState({
    content: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://strangers-things.herokuapp.com/api/2202-FTB-WEB-FT/posts/${_id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: form }),
        }
      );
      const { success, data: messages, error } = await response.json();
      if (success) {
        setForm(messages);
      } else {
        throw new Error("error sending the message");
      }
      console.log(messages);
      // here's where we can use history.push('/wherever')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formField">
        <label>Content: </label>
        <input
          type="text"
          name="content"
          value={form.content}
          onChange={handleChange}
        />
      </div>
      <input type="submit" value="Send Message" />
    </form>

    // <div> HI I'm new message</div>
  );
};

export default Message;
