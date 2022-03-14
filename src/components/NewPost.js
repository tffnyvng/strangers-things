import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../custom-hooks";

const NewPost = () => {
  const history = useHistory();
  const { token } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "On request",
    willDeliver: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // form.date = new Date().toISOString;

    try {
      const response = await fetch(
        "https://strangers-things.herokuapp.com/api/2202-FTB-WEB-FT/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ post: form }),
        }
      );
      const {
        data: { post },
      } = await response.json();
      console.log(post);
      // here's where we can use history.push('/wherever')
      history.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <h2>New Post</h2>
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
          <label>Price: </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>
        <div className="formField">
          <label>Description: </label>
          <textarea
            style={{ borderRadius: "5px" }}
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="formField">
          <label>Location: </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value={"Post"} />
        <button
          onClick={() => {
            history.push("/home");
          }}
        >
          Cancel
        </button>
      </form>
    </section>
  );
};
export default NewPost;
