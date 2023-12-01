import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import './SearchResults.css'



export default function SearchResults(props) {
    
    return (
        <div className="searchResults"> 
            <Tracklist tracks={props.searchResults} addTrack={props.addTrack} />
        </div>
    )
}