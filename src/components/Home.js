import React, { useState, useEffect } from "react";
import Message from "./Message";
import { useAuth } from "../custom-hooks";
import styled from "styled-components";

const Posts = styled.section`
  & {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
    box-shadow: 2px 2px 5px gray;
    padding: 1rem;
    margin: 1rem;
  }
  & > * {
    padding: 0.5 rem;
    margin-left: 0.5rem;
    padding: 1rem;
  }

  & > button {
    display: flex;
    align-self: flex-end;
  }
`;

const MsgBtn = styled.button`
  & {
    width: 120px;
    padding: 0.5rem;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 25%;
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { token } = useAuth();

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
        location,
        willDeliver,
        messages,
        active,
        _id,
      });
      return (
        <Posts key={_id}>
          <h3>{title}</h3>
          <div>Price: {price}</div>
          <label>Description: </label>
          <div>{description}</div>
          <div>Location: {location}</div>
          <MsgBtn htmlFor="messages" onClick={() => <Message />}>
            Send message
          </MsgBtn>
        </Posts>
      );
    }
  );
};
export default Home;
