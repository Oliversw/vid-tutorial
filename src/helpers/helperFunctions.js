export const searchForTerm = (list, terms) => {
  // filter objects to check for matches in video titles or teacher names
  const condition = new RegExp(terms);
  const filteredList = list.filter((el) => {
    let result =
      condition.test(el.videoTitle) || condition.test(el.teacherName);
    return result;
  });
  return filteredList;
};

export const defineTags = (tagString) => {
  // split the search input into an array with no empty elements, and no duplicates
  // also make sure that capitalization matches that of JSON regardless of user input
  const result = [];
  tagString
    .split(" ")
    .filter((el) => el.length !== 0)
    .map((el) => {
      const lower = el.toLowerCase();
      const capitalized = lower[0].toUpperCase() + lower.substring(1);
      if (result.indexOf(capitalized) === -1) result.push(capitalized);
    });
  // return up to 5 tags in order to keep filtering from getting too slow
  return result.slice(0, 5);
};

export const searchForTags = (list, tagsArr) => {
  let result = [];
  // use for loop to iterate over sorted list so that we can break out upon reaching 20
  for (let i = 0; i < list.length; i++) {
    // create array with input tags and search tags combined
    const combined = [...tagsArr, ...list[i].tags];
    // compare combined array against a set to find duplicates (i.e. matches) and push into array
    if (combined.length !== new Set(combined).size) {
      result.push(list[i]);
      if (result.length >= 20) {
        i = list.length;
      }
    }
  }
  return result;
};
