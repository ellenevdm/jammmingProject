import React, { useState } from "react";
import './SearchBar.css'

export default function SearchBar(props) {

    const [searchTerm, setSearchTerm] = useState('');

    const searchTermChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearch = () => {
        props.onSearch(searchTerm)
    }

    const handleKeyPress =(e) => {
        if(e.key === 'Enter'){
            handleSearch()
        }
    }

    return (
        <div className="searchBar">
            <div className="searchInput">
                <h2>
                    <input type="text"
                        placeholder="Enter song, artist or album"
                        value={searchTerm}
                        onChange={searchTermChange}
                        onKeyDown={handleKeyPress}
                    />
                </h2>
            </div>
            <div className="searchButton"><button onClick={handleSearch}>Search</button></div>
        </div>
    )
}





