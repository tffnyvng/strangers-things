import React, { useState, useEffect } from "react";

//we want this Feed function to provide a scrollable view of the items for sale on this website

const Feed = () => {
  const [posts, setPosts] = useState({});

  // async func of getPosts bc we need to wait for the info to be grabbed from the website
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          "https://strangers-things.herokuapp.com/api/2202-FTB-WEB-FT/posts"
        );
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, []);

  //this console logs nothing, but the return works and will show the items on the site.
  console.log(posts);
  // return <pre>{JSON.stringify(posts, null, 2)})</pre>;

  //this return has the posts object inside of the data object so we need to go into whole 'container' twice to get what we wanted
  //ok this seems to only work AFTER i do the return statement above ^.
  //don't use create&update till you turn it back to a normal timestap
  return posts.data.posts.map(
    ({
      title,
      price,
      description,
      createdAt,
      updatedAt,
      location,
      willDeliver,
      messages,
      active,
    }) => {
      console.log({
        title,
        price,
        description,
        createdAt,
        updatedAt,
        location,
        willDeliver,
        messages,
        active,
      });
      return (
        <section>
          <h3>{title}</h3>
          <div>Price: {price}</div>
          <label>Description: </label>
          <div>{description}</div>
          <div>Location: {location}</div>
          <button for="messages">Send message</button>
        </section>
      );
    }
  );
};
export default Feed;
