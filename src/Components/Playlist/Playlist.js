import React, { useState } from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";
import { useDrop } from "react-dnd";
import { MdClear } from "react-icons/md";
import { MdSaveAlt } from "react-icons/md";

export default function Playlist(props) {
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isTyping, setIsTyping] = useState(false); 

  const [{ isOver }, drop] = useDrop({
    accept: "TRACK",
    drop: (item, monitor) => {
      const didDrop=monitor.didDrop
      if(!didDrop) {
        props.removeTrack(item.track)
      } else{
      props.addTrack(item.track)
    }
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

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };
  
  const handleInputBlur = () => {
    setIsInputFocused(false);
  };
  

  return (
    <div ref={drop} className={`playlist ${isOver ? "dragging-over" : ""}`}>
      <div className="playlistName input-container">
        <div className={`input-wrapper ${isInputFocused ? 'active' : ''}`}>
          <input
            type="text"
            placeholder="New Playlist"
            value={props.playlistName}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />

          {isTyping && props.playlistName.trim() !== "" && (
            <button className="clearButton" onClick={handleClear}>
              <MdClear />
            </button>
          )}

          <button className="sBtn" onClick={handleSubmit}>
            <div className="sIcon">
            <MdSaveAlt />
            </div>
            <div className="sText">Save</div>
          </button>
        </div>
      </div>

      <div className="list">

        <Tracklist
          tracks={props.playlistTracks}
          removeTrack={props.removeTrack}
          offset={1}
        />
        
      </div>
      
    </div>
  );
}
