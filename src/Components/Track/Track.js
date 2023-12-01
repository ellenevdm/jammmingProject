import React from "react";
import './Track.css'
// import ReactDOM from 'react-dom'
import { CgAddR } from "react-icons/cg";
import { CgRemoveR } from "react-icons/cg";


export default function Track(props) {
  const handleClick = () => {
    if (props.addTrack) {
        props.addTrack(props.track)
    } else if(props.removeTrack) {
        props.removeTrack(props.track)
    };
    
  };

  let button;
  if (props.addTrack) {
    button = <button onClick={handleClick}><CgAddR /></button>;
  } else {
    button = <button onClick={handleClick}><CgRemoveR /></button>;
  }

  return (
    <div className={`track ${props.index % 2 === 0 ? 'even' : 'odd'}`}>
      <div className="trackInfo">
        <h3>{props.track.name}</h3>
        
          <div>
            <p>
            <strong>{props.track.artist}</strong>  |{' '}
            <em>{props.track.album}</em>
            </p>
          </div>
      </div>
      <div className="trackbutton">{button}</div>
    </div>
  );
}
