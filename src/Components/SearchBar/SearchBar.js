import React, { useState } from "react";
import "./SearchBar.css";
import { MdOutlineSearch } from "react-icons/md";
import { MdClear } from "react-icons/md";




export default function SearchBar(props) {
  const [isInputFocused, setIsInputFocused] = useState(false)
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

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };
  
  const handleInputBlur = () => {
    setIsInputFocused(false);
  };
  



  return (
    <div className="searchBar">
      <div className="input-container">
        <div className={`input-wrapper ${isInputFocused ? 'active' : ''}`}>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={searchTermChange}
            onKeyDown={handleKeyPress}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            
          />

          {isTyping && searchTerm.trim() !== "" && (
          <button onClick={handleClear} className="clearButton">
            <MdClear />
          </button>
          )}

          <button onClick={handleSearch} className="sBtn">
            <div className="sIcon">
              <MdOutlineSearch />
            </div>
            <div className="sText">Search</div>
          </button>
        </div>
      </div>
    </div>
  );
}
