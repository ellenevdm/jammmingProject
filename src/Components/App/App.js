import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Spotify from "../../Spotify/Spotify";

function App() {
  // const [search, setSearch] = useState("");
  
  const [spotifyResults, setSpotifySearchResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const token = Spotify.GetToken();
  
  const handleNameChange = (event) => {
      setPlaylistName(event.target.value)
  }

  const search = (term) => {
    Spotify.search(token,term)
    .then((results) => {
      setSpotifySearchResults(results)
    })
    .catch((error) => {
      console.log(error)
    })
  };

  useEffect(() => {
    setSearchResults(
      spotifyResults.filter(
        (f) =>
          !playlistTracks.some((savedTrack) => savedTrack.id === f.id)
      )
    );
  },[spotifyResults,playlistTracks])



   // const [playlistName, setPlaylistName] = useState("My Playlist");

  const addTrack = (track) => {
    let isTrackInPlaylist = playlistTracks.some(
      (savedTrack) => savedTrack.id === track.id
    );
    if (!isTrackInPlaylist) {
      let tracks = [...playlistTracks, track];
      setPlaylistTracks(tracks);
    }
  };

  const removeTrack = (track) => {
    let isTrackInPlaylist = playlistTracks.some(
      (savedTrack) => savedTrack.id === track.id
    );
    if (isTrackInPlaylist) {
      let tracks = playlistTracks.filter((removedTrack) => removedTrack.id !== track.id);
      setPlaylistTracks(tracks);
    }
  }

  const savePlaylistToSpotify = () => {
    const trackUris = playlistTracks.map((track) => track.uri)
debugger;
    if(Spotify.savePlaylist(token,playlistName, trackUris)){    
      setPlaylistName('')
      setPlaylistTracks([])
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <div className="header">
          <h1>Ja<span className="mmm">mmm</span>ing</h1>
      
        </div>
        <div className="resultsContainer">
          <div className="search list">
          <div className ="searchBox">
            <SearchBar onSearch={search} />
          </div>
          <SearchResults searchResults={searchResults} addTrack={addTrack} />
          </div>
          <div class="newplaylist list">
            <Playlist addTrack={addTrack} handleNameChange={handleNameChange} playlistName={playlistName} playlistTracks={playlistTracks} removeTrack={removeTrack} onSave={savePlaylistToSpotify}/>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
