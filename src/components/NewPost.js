import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../custom-hooks";
import styled from "styled-components";

const NewPostForm = styled.form`
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;
  }

  & > * {
    padding: 0.3rem;
    margin-top: 0.2rem;
  }

  button {
    border-radius: 25%;
  }
`;

const SubmitBtn = styled.input`
  border-radius: 25%;
`;

const TextBox = styled.input`
  padding: 0.2rem;
  border: none;
  border-radius: 10%;
  box-shadow: 2px 2px 5px gray;
`;

const DescriptionBox = styled.textarea`
  border: none;
  box-shadow: 2px 2px 5px gray;
`;

const NewPost = () => {
  const history = useHistory();
  const { token } = useAuth();
  //console.log(token);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // form.date = new Date().toISOString;
    console.log(form, token);
    try {
      const response = await fetch(
        "http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ post: form }),
        }
      );
      console.log(response);

      const { success, data: posts, error } = await response.json();
      console.log(success, posts, error);
      if (success) {
        // history.push("/home");
        console.log("Yay success");
      } else {
        throw new Error("error creating post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NewPostForm onSubmit={handleSubmit}>
      <h2>New Post</h2>
      <div className="formField">
        <label>Title: </label>
        <TextBox
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </div>
      <div className="formField">
        <label>Price: </label>
        <TextBox
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
      </div>
      <div className="formField">
        <label>Description: </label>
        <DescriptionBox
          style={{ borderRadius: "5px" }}
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div className="formField">
        <label>Location: </label>
        <TextBox
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
        />
      </div>

      <SubmitBtn type="submit" value={"Post"} />
      <button
        onClick={() => {
          history.push("/home");
        }}
      >
        Cancel
      </button>
    </NewPostForm>
  );
};
export default NewPost;

// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useAuth } from "../custom-hooks";

// export default function NewPost() {
//   const history = useHistory();
//   const { token } = useAuth();

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//   });

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       // fetch to get a response whether our POST action was successful
//       const response = await fetch(
//         `http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ post: form }),
//         }
//       );
//       // resolve data
//       const { success, data, error } = await response.json();

//       // we leverage the history api to shunt our user elsewhere after successful POST action
//       if (success) {
//         history.push("/posts");
//       } else {
//         throw new Error("error creating post");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>title</label>
//         <input
//           type="text"
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>description</label>
//         <input
//           type="text"
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>price</label>
//         <input
//           type="text"
//           name="price"
//           value={form.price}
//           onChange={handleChange}
//         />
//       </div>
//       <input type="submit" value="create new post" />
//     </form>
//   );
// }
