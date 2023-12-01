import React from "react";
import './Playlist.css'
import Tracklist from "../Tracklist/Tracklist";

export default function Playlist(props) {


    

    return (
        <div className="playlist"> 
            <div className="playlistName">
                <h2><input type="text" placeholder="New Playlist" value={props.playlistName} onChange={props.handleNameChange} /></h2>
                <button onClick={props.onSave}>Save to Spotify</button>
            </div>
            <Tracklist tracks={props.playlistTracks} removeTrack={props.removeTrack}/>
            
        </div>
    )
}