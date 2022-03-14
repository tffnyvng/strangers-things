import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//how do i use useHistory (?) followed the NewBlog.js and it says my newPost function cannot use it bc it is not a react component nor a custom hook
const newPost = () => {
  const history = useHistory();

  const [form, setForm] = useState({
    title: "",
    content: "",
    price: "",
    location: "",
    willDeliver: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.bane]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.date = new Date().toISOString;

    try {
      await fetch(
        "https://strangers-things.herokuapp.com/api/2202-FTB-WEB-FT/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      history.push("/posts");
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
            name="title"
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
            history.push("/post");
          }}
        >
          Cancel
        </button>
      </form>
    </section>
  );
};
export default newPost;
