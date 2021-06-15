import React, { useState, useEffect } from "react";
import "./styles/App.css";

function App() {
  const [list, setList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMethod, setSearchMethod] = useState("");
  const [searchTerms, setSearchTerms] = useState("");
  // const [searchTags, setSearchTags] = useState([]);

  useEffect(() => {
    fetchData();
    sortByRating(list);
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

  const compareFunction = (a, b) => {
    // function to sort an array of objects by averageUserRating
    const ratingA = a.averageUserRating;
    const ratingB = b.averageUserRating;

    let comparison = 0;
    if (ratingA > ratingB) {
      comparison = 1;
    } else if (ratingA < ratingB) {
      comparison = -1;
    }
    return comparison * -1;
  };

  const sortByRating = (data) => {
    // function to copy, sort and set the list as part of state
    console.log("beginning sort");
    const sorted = [...data].sort(compareFunction);
    setSortedList(sorted);
  };

  const searchTags = () => {
    // split the search input into an array with a max size of 5 elements and no empty elements
    // also make sure that capitalization matches that of JSON regardless of user input
    const tags = searchTerms
      .split(" ")
      .filter((el) => el.length !== 0)
      .slice(0, 5)
      .map((el) => {
        const lower = el.toLowerCase();
        return lower[0].toUpperCase() + lower.substring(1);
      });

    console.log(tags);

    let result = [];

    // use for loop to iterate over sorted list so that we can break out upon reaching 20
    for (let i = 0; i < sortedList.length; i++) {
      // create array with input tags and search tags combined
      const combined = [...tags, ...sortedList[i].tags];
      // compare combined array against a set to find duplicates (i.e. matches) and push into array
      if (combined.length !== new Set(combined).size) {
        console.log(sortedList[i]);
        result.push(sortedList[i]);
        if (result.length >= 20) {
          console.log("res", result);
          setRenderList(result);
          i = sortedList.length;
        }
      }
    }
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
                  Enter up to five tags that you would like to search for
                  separated by spaces and then press search. The top 20 rated
                  video tutorials, which contain any of the tags provided will
                  be returned.
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                    setSearchTerms(e.target.value);
                  }}
                ></input>
                <button onClick={searchTags}>Search Tags</button>
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
