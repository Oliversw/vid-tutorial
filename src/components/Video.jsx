import React from "react";

const Video = (props) => {
  const rating = (props.rating * 100).toFixed();

  return (
    <li className="videoContainer">
      <a href={props.url}>
        <p>{props.title}</p>
      </a>
      <p>Teacher: {props.teacher}</p>
      <p>Average rating: {rating}/100</p>
      <ul className="tagContainer">
        {props.tags.map((el) => {
          return <li className="tags">{el}</li>;
        })}
      </ul>
    </li>
  );
};

export default Video;
