import React, { useState, useEffect } from "react";
import "./styles/App.css";

function App() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMethod, setSearchMethod] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log("Fetching data");
    setLoading(true);
    fetch("https://lingumi-take-home-test-server.herokuapp.com/videoTutorials")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data);
        setLoading(false);
      });
  };

  const renderVids = (vidList, num) => {
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1>Vid-Tutorial</h1>
            <p>Filter results by:</p>
            <select onChange={(e) => setSearchMethod(e.currentTarget.value)}>
              <option value="">Choose an option</option>
              <option value="term">Search term</option>
              <option value="tags">Tags</option>
            </select>
            {searchMethod === "term" && (
              <>
                <p>Enter your search term and then press refresh</p>
                <input type="text"></input>
              </>
            )}
            {searchMethod === "tags" && (
              <>
                <p>
                  Enter the tags that you would like to search for separated by
                  commas. The top 20 rated video tutorials, which contain any of
                  the tags provided will be returned.
                </p>
                <input type="text"></input>
              </>
            )}

            <button onClick={fetchData}>Refresh</button>
            <ul>{renderVids(list, 10)}</ul>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
