import React from "react";
import "./Track.css";
// import ReactDOM from 'react-dom'
import { FiPlusSquare } from "react-icons/fi";
import { FiMinusSquare } from "react-icons/fi";
import { useDrag } from "react-dnd";

export default function Track(props) {
  const [{ isDragging }, drag] = useDrag({
    type: "TRACK",
    item: { track: props.track },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if(!didDrop && props.removeTrack) {
        props.removeTrack(props.track)
      }
    },
  });

  const handleClick = () => {
    if (props.addTrack) {
      props.addTrack(props.track);
    } else if (props.removeTrack) {
      props.removeTrack(props.track);
    }
  };

  let button;
  if (props.addTrack) {
    button = (
      <button onClick={handleClick}>
        <FiPlusSquare />
      </button>
    );
  } else {
    button = (
      <button onClick={handleClick}>
        <FiMinusSquare />
      </button>
    );
  }

  return (
    <div
    ref={drag}
    className={`track ${((props.offset??0) + props.index) % 2 === 0 ? "even" : "odd"} ${
      isDragging ? "dragging" : ""
    }`}
    style={{ display: isDragging ? "none" : "flex" }}
    >
      {!isDragging && ( 
        <>
              <div className="trackInfo">
        
        <h4>{props.track.name}</h4>

          <div>
            <p>
             {props.track.artist} | <em>{props.track.album}</em>
            </p>
          </div>

      </div>
      <div className="trackbutton">{button}</div>
      </>
      )}

    </div>
  );
}
