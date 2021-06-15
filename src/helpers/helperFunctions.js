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
