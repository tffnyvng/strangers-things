import React, { useState, useEffect } from 'react';
import Message from './Message';
import Search from './Search';
import { useAuth } from '../custom-hooks';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const MsgBtn = styled(Link)`
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
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState(false);
  const { token, isLoggedIn } = useAuth();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          'http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const {
          data: { posts },
        } = await response.json();
        // console.log(posts);
        setPosts(posts);
        setFilteredPosts(posts);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, []);

  const filterPostsBySearchTerm = (searchTerm) => {
    const postContainsSearchTerm = (post, searchTerm) => {
      // if searchTerm is falsy ie is empty string
      if (searchTerm === '') {
        console.log('search is empty!');
        return true;
      }

      console.log('hit filter posts fn');

      for (const key in post) {
        if (typeof post[key] === 'string') {
          // if the searchTerm is defined and it's not found
          // this boolean will be false
          // otherwise, the string was found at some index
          // starting from (and including) zero :D

          if (post[key].indexOf(searchTerm) >= 0) return true;
        }
      }

      return false;
    };

    // this keeps the original posts intact by
    // generating a fresh copy that's immutable, ie not linked in memory, to the original posts
    // so we can return to the unfiltered posts array
    // whenever the user clears search :D
    setFilteredPosts(
      posts.filter((post) => postContainsSearchTerm(post, searchTerm))
    );

    setFilter(!filter);
  };

  const [postsToDisplay, setPostsToDisplay] = useState([]);

  useEffect(() => {
    setPostsToDisplay(
      filteredPosts.length < posts.length ? filteredPosts : posts
    );
  }, [filter, filteredPosts, posts]);

  console.log({ postsToDisplay });

  return (
    <div>
      <Search filterPostsBySearchTerm={filterPostsBySearchTerm} />
      {postsToDisplay.map(({ title, price, description, location, _id }) => {
        // console.log({
        //   title,
        //   price,
        //   description,
        //   location,
        //   willDeliver,
        //   messages,
        //   _id,
        // });
        return (
          <Posts key={_id}>
            <h3>{title}</h3>
            <div>Price: {price}</div>
            <label>Description: </label>
            <div>{description}</div>
            <div>Location: {location}</div>
            {isLoggedIn && (
              <MsgBtn to={`/posts/${_id}/messages/new`} htmlFor="messages">
                Send message
              </MsgBtn>
            )}
          </Posts>
        );
      })}
    </div>
  );
};
export default Home;
