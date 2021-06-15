import React from "react";

const Video = (props) => {
  const rating = (props.rating * 100).toFixed();

  return (
    <li>
      <a href={props.url}>
        <p>{props.title}</p>
      </a>
      <p>Teacher: {props.teacher}</p>
      <p>Average rating: {rating}/100</p>
      <ul>
        {props.tags.map((el) => {
          return <li>{el}</li>;
        })}
      </ul>
    </li>
  );
};

export default Video;
