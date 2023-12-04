import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";
import { useDrop } from "react-dnd";

export default function Playlist(props) {
  const [{ isOver }, drop] = useDrop({
    accept: "TRACK",
    drop: (item) => {
      props.addTrack(item.track);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`playlist ${isOver ? 'dragging-over' : ''}`}>
      <div className="playlistName">
        <h2>
          <input
            type="text"
            placeholder="New Playlist"
            value={props.playlistName}
            onChange={props.handleNameChange}
          />
        </h2>
        <button onClick={props.onSave}>Save to Spotify</button>
      </div>
      <Tracklist
        tracks={props.playlistTracks}
        removeTrack={props.removeTrack}
      />
    </div>
  );
}
