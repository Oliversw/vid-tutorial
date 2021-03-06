import React, { useState, useEffect } from "react";
import "./styles/App.css";
import {
  searchForTerm,
  defineTags,
  searchForTags,
  sortByRating,
} from "./helpers/helperFunctions";
import Video from "./components/Video.jsx";

function App() {
  const [list, setList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMethod, setSearchMethod] = useState("");
  const [searchTerms, setSearchTerms] = useState("");

  // run initial fetch and state setting
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch("https://lingumi-take-home-test-server.herokuapp.com/videoTutorials")
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        return res;
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data);
        setRenderList(data.slice(0, 20));
        setLoading(false);
        // sort data up front to reduce time spent sorting the tag function
        sortVideos(data);
        return;
      })
      .catch((error) => {
        throw Error(error);
      });
  };

  const refreshAll = () => {
    fetchData();
    setSearchMethod("");
    setSearchTerms("");
  };

  const renderVids = (vidList) => {
    if (vidList.length === 0) {
      return <p>No results found</p>;
    } else {
      return vidList.map((el, ind) => {
        return (
          <Video
            key={"vid" + ind}
            url={el.videoUrl}
            title={el.videoTitle}
            teacher={el.teacherName}
            tags={el.tags}
            rating={el.averageUserRating}
          />
        );
      });
    }
  };

  const sortVideos = (data) => {
    const sorted = sortByRating(data);
    setSortedList(sorted);
  };

  const searchForTutorials = () => {
    if (searchTerms === "") return;
    setRenderList(searchForTerm(list, searchTerms));
  };

  const getTopRatedTutorialsForTags = () => {
    if (searchTerms === "") return;
    const tags = defineTags(searchTerms);
    const result = searchForTags(sortedList, tags);
    setRenderList(result);
  };

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="heading">Vid-Tutorial</h1>
          <p>Filter results by:</p>
          <select onChange={(e) => setSearchMethod(e.currentTarget.value)}>
            <option value="">Choose an option</option>
            <option value="term">Search term</option>
            <option value="tags">Tags</option>
          </select>
          {searchMethod === "term" && (
            <>
              <p>
                Enter your search term and then press search. The input is case
                sensitive and will search through the video titles and teachers.
              </p>
              <input
                type="text"
                onChange={(e) => {
                  setSearchTerms(e.target.value);
                }}
              ></input>
              <button onClick={() => searchForTutorials()}>Search</button>
            </>
          )}
          {searchMethod === "tags" && (
            <>
              <p>
                Enter up to five tags that you would like to search for. The
                tags should be separated by spaces. The search will return the
                top 20 rated videos that match any of the included tags.
              </p>
              <input
                type="text"
                onChange={(e) => {
                  setSearchTerms(e.target.value);
                }}
              ></input>
              <button onClick={getTopRatedTutorialsForTags}>Search Tags</button>
            </>
          )}

          <button onClick={refreshAll}>Refresh</button>
          <ul>{renderVids(renderList)}</ul>
        </>
      )}
    </div>
  );
}

export default App;
