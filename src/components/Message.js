import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../custom-hooks";
import styled from "styled-components";

const MessageForm = styled.form`
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: auto;
    padding: 1rem;
  }

  & > * {
    padding: 0.5rem;
    border-radius: 25%;
  }

  h2 {
    text-decoration: underline;
  }
`;

const MsgBox = styled.textarea`
  border: none;
  box-shadow: 2px 2px 5px gray;
`;

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
      history.push("/home");
      // here's where we can use history.push('/wherever')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MessageForm onSubmit={handleSubmit}>
      <div className="formField">
        <h2>Message</h2>
        <label>Content: </label>
        <MsgBox
          type="text"
          name="content"
          value={form.content}
          onChange={handleChange}
        />
      </div>
      <input type="submit" value="Send Message" />
    </MessageForm>

    // <div> HI I'm new message</div>
  );
};

export default Message;
