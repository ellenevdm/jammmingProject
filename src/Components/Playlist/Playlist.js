import React, { useState } from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";
import { useDrop } from "react-dnd";

import { FaSpotify } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import IconPlaylistStar from "../../SVGs/saveIcon";

export default function Playlist(props) {
  const [isTyping, setIsTyping] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: "TRACK",
    drop: (item) => {
      props.addTrack(item.track);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleInputChange = (event) => {
    props.handleNameChange(event);
    setIsTyping(!!event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isTyping && props.playlistName.trim() !== "") {
      props.onSave();
    }
  };

  const handleClear = () => {
    props.handleNameChange({ target: { value: "" } });
  };

  return (
    <div ref={drop} className={`playlist ${isOver ? "dragging-over" : ""}`}>
      <div className="playlistName input-container">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="New Playlist"
            value={props.playlistName}
            onChange={handleInputChange}
          />

          {isTyping && props.playlistName.trim() !== "" && (
            <button className="clearButton" onClick={handleClear}>
              <MdClear />
            </button>
          )}

          <button className="saveBtn" onClick={handleSubmit}>
            <div className="playlistIcon">
              <IconPlaylistStar />
            </div>
            <div className="playlistText">Save</div>
          </button>
        </div>
      </div>
      <Tracklist
        tracks={props.playlistTracks}
        removeTrack={props.removeTrack}
      />
    </div>
  );
}
