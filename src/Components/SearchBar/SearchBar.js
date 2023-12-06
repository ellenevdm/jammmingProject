import React, { useState } from "react";
import "./SearchBar.css";

import { MdClear } from "react-icons/md";


import IconBxSearch from "../../SVGs/searchIcon";

export default function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const searchTermChange = (e) => {
    setSearchTerm(e.target.value);
    setIsTyping(!!e.target.value); // Set isTyping to true if there is input, otherwise false
  };

  const handleSearch = () => {
    props.onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm('')
  }


  return (
    <div className="searchBar">
      <div className="input-container">
        <div className="input-wrapper">

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={searchTermChange}
            onKeyDown={handleKeyPress}
          />

          {isTyping && searchTerm.trim() !== "" && (
          <button onClick={handleClear} className="clearButton">
            <MdClear />
          </button>
          )}

          <button onClick={handleSearch} className="searchBtn">
            <div className="srchIcon">
              <IconBxSearch />

            </div>


          </button>
        </div>
      </div>
    </div>
  );
}
