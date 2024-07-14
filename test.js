
let itemsPerData;
function getSpeicficData(
  currentPage,
  data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  itemsPerData = 5
) {
  let filteredData = data.slice((currentPage)*itemsPerData,itemsPerData*currentPage);

  return filteredData;
}

console.log(getSpeicficData(1));
