import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SearchBar = styled.form`
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    padding: 0.5rem;
  }

  & > * {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 600px;
    padding: 0.5rem;
    border: none;
    box-shadow: 2px 2px 5px gray;
  }

  input {
    width: 400px;
    padding: 0.5rem;
    border: none;
  }

  button {
    padding: 0.5rem;
    border-radius: 25%;
  }
`;

const Search = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts"
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

  function postMatches(post, text) {
    post.includes(text);
    return post;
  }

  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;
  //map over postsToDisplay instead of posts. but where do i put the posts??
  return (
    <SearchBar id="search" onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="keywords">Looking for:</label>
        <input
          id="keywords"
          type="text"
          placeholder="enter keywords"
          value={searchTerm}
          onChange={handleChange}
        />
        <button>Search</button>
      </fieldset>
    </SearchBar>
  );
};

export default Search;
