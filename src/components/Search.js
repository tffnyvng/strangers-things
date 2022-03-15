import React, { useState, useEffect } from "react";

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

  function postMatches(post, text) {}

  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <form id="search" onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="keywords">Search</label>
        <input
          id="keywords"
          type="text"
          placeholder="enter keywords"
          value={searchTerm}
          onChange={handleChange}
        />
        <button>Search</button>
      </fieldset>
    </form>
  );
};

export default Search;
