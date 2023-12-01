import React from "react";
import Track from "../Track/Track";
import './Tracklist.css'

export default function Tracklist(props) {
  return (
    <div className="tracklist">
      {props.tracks.map((track, index) => (
        <Track 
        key={track.id} 
        track={track} 
        addTrack={props.addTrack} 
        removeTrack={props.removeTrack}
        index={index} />
      ))}
    </div>
  );
}
