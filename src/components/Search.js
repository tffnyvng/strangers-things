import React, { useState } from "react";
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
`;

const KeyWordsSearch = styled.input`
  & {
    width: 400px;
    padding: 0.5rem;
    border: none;
  }
`;

const SearchBtn = styled.input`
  & {
    padding: 0.5rem;
    border-radius: 25%;
  }
`;

const Search = ({ filterPostsBySearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [noMatches, setNoMatches] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setNoMatches(false);
    }

    console.log("hit blur");
    console.log({ e: e.target.value });

    filterPostsBySearchTerm(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    console.log("hit search click");
    filterPostsBySearchTerm(searchTerm);
  };

  return (
    <>
      <SearchBar id="search">
        <fieldset>
          <label htmlFor="keywords">Looking for:</label>
          <KeyWordsSearch
            id="keywords"
            type="text"
            placeholder="enter keywords"
            value={searchTerm}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <SearchBtn type="button" onClick={handleSearchClick} value="Search" />
        </fieldset>
      </SearchBar>
      {noMatches && <aside>No matches found.</aside>}
    </>
  );
};

export default Search;
