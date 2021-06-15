import React, { useState, useEffect } from "react";
import "./styles/App.css";

function App() {
  const [list, setList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMethod, setSearchMethod] = useState("");
  const [searchTerms, setSearchTerms] = useState("Peter");

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
        setRenderList(data.slice(0, 10));
        setLoading(false);
      });
  };

  const renderVids = (vidList) => {
    // const shortList = vidList.slice(0, num);
    return vidList.map((el, ind) => {
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

  const searchByTerms = (list, terms) => {
    const condition = new RegExp(terms);
    const filteredList = list.filter((el) => {
      let result =
        condition.test(el.videoTitle) || condition.test(el.teacherName);
      console.log(result);
      return result;
    });
    console.log(filteredList);
    setRenderList(filteredList);
  };

  const refreshAll = () => {
    fetchData();
    setSearchMethod("");
    setSearchTerms("");
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
                <p>
                  Enter your search term and then press search. The input is
                  case sensitive.
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                    setSearchTerms(e.target.value);
                  }}
                ></input>
                <button onClick={() => searchByTerms(list, searchTerms)}>
                  Search
                </button>
              </>
            )}
            {searchMethod === "tags" && (
              <>
                <p>
                  Enter the tags that you would like to search for separated by
                  commas and then press search. The top 20 rated video
                  tutorials, which contain any of the tags provided will be
                  returned.
                </p>
                <input type="text"></input>
                <button>Search</button>
              </>
            )}

            <button onClick={refreshAll}>Refresh</button>
            <ul>{renderVids(renderList)}</ul>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
