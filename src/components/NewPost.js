import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../custom-hooks";

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
    <form onSubmit={handleSubmit}>
      <h2>New Post</h2>
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
          type="text"
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
          value={form.location || "[On Request]"}
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
