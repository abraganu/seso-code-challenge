// use this function for a binary search
function findIndexToInsert(searchElement, array = []) {
  let minIndex = 0
  let maxIndex = array.length - 1
  let currentIndex
  let currentElement

  while (minIndex <= maxIndex) {
    currentIndex = (minIndex + maxIndex) / 2 | 0
    currentElement = new Date(array[currentIndex].date).getTime()

    if (currentElement < searchElement) {
      minIndex = currentIndex + 1
    } else if (currentElement > searchElement) {
      maxIndex = currentIndex - 1
    } else {
      return {
        found: true,
        index: currentIndex
      }
    }
  }

  // In reality this is the result im expecting
  return {
    found: false,
    index: currentElement < searchElement ? currentIndex + 1 : currentIndex
  }
}

module.exports = {
  findIndexToInsert,
  sortLogsEntries
}