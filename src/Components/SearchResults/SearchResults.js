import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./SearchResults.css";
import { useDrop } from "react-dnd";

export default function SearchResults(props) {
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
    <div
      ref={drop}
      className={`searchResults ${isOver ? "dragging-over" : ""}`}
    >
      <Tracklist tracks={props.searchResults} addTrack={props.addTrack} />
    </div>
  );
}
