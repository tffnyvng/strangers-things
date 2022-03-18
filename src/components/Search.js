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

const Search = ({ posts, setPosts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //mainly for forms
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(
  //       "http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts"
  //     );
  //     const {
  //       data: { posts },
  //     } = await response.json();
  //     console.log(posts);
  //     setPosts(posts);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  function postMatches(post, text) {
    const postTitle = post.title.toLowerCase();
    const postDesc = post.description.toLowerCase();

    if (
      postTitle.includes(text.toLowerCase()) ||
      postDesc.includes(text.toLowerCase())
    ) {
      return true;
    }
  }

  //need to figure out how to set it on default post view when searchbar is empty; so far it only works one way
  const handleSearchClick = () => {
    setIsSearching(true);
  };

  useEffect(() => {
    if (!isSearching) {
      return false;
    }
    const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
    const postsToDisplay = searchTerm.length ? filteredPosts : posts;
    console.log(searchTerm);
    if (!posts) {
      return "No matches found";
    }
    setPosts(postsToDisplay);
    setIsSearching(false);
  }, [isSearching === true]);

  //can i use button for search instead of input?
  return (
    <SearchBar id="search">
      <fieldset>
        <label htmlFor="keywords">Looking for:</label>
        <input
          id="keywords"
          type="text"
          placeholder="enter keywords"
          value={searchTerm}
          onChange={handleChange}
        />
        <input type="button" onClick={handleSearchClick} value="Search" />
      </fieldset>
    </SearchBar>
  );
};

export default Search;
