import React, { useState, useEffect } from "react";
import "./styles/App.css";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log("Fetching data");
    fetch("https://lingumi-take-home-test-server.herokuapp.com/videoTutorials")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data);
      });
  };

  const renderVids = function (vidList, num) {
    const shortList = vidList.slice(0, num);
    return shortList.map((el, ind) => {
      return (
        <li key={"vid" + ind}>
          <a href={el.videoUrl}>
            <p>{el.videoTitle}</p>
          </a>
          <p>Teacher: {el.teacherName}</p>
        </li>
      );
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vid-Tutorial</h1>
        {list.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <>
            <button onClick={fetchData}>Refresh</button>
            <ul>{renderVids(list, 10)}</ul>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
