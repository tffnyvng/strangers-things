import React, { useState, useEffect } from "react";
import Message from "./Message";
import { useAuth } from "../custom-hooks";

//we want this Feed function to provide a scrollable view of the items for sale on this website

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { token } = useAuth();

  // async func of getPosts bc we need to wait for the info to be grabbed from the website
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          "http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const {
          data: { posts },
        } = await response.json();
        console.log(posts);
        setPosts(posts);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, []);

  console.log(posts);
  // return <pre>{JSON.stringify(posts, null, 2)})</pre>;

  //don't use create&update till you turn it back to a normal timestap
  return posts.map(
    ({
      title,
      price,
      description,
      // createdAt,
      // updatedAt,
      location,
      willDeliver,
      messages,
      active,
      _id,
    }) => {
      console.log({
        title,
        price,
        description,
        // createdAt,
        // updatedAt,
        location,
        willDeliver,
        messages,
        active,
        _id,
      });
      return (
        <section key={_id}>
          <h3>{title}</h3>
          <div>Price: {price}</div>
          <label>Description: </label>
          <div>{description}</div>
          <div>Location: {location}</div>
          {/* <Link to={`/posts/${post._id}/edit?`}>Edit Post </Link> */}
          <button htmlFor="messages" onClick={() => <Message />}>
            Send message
          </button>
        </section>
      );
    }
  );
};
export default Home;
