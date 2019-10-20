const getWordData = (wordArray) => {
  const wordCounts = {};
  let wordCountTotal = 0;

  for (let i = wordArray.length - 1; i >= 0; i--) { // eslint-disable-line
    const word = wordArray[i];
    if (word) {
      wordCountTotal += word.length;

      if (wordCounts[`${word.length}`]) {
        wordCounts[`${word.length}`] += 1;
      } else {
        wordCounts[`${word.length}`] = 1;
      }
    }
  }
  const averageWordCount = (wordCountTotal / wordArray.length).toFixed(3);
  const wordData = {
    totalWords: wordArray.length,
    averageWordCount,
    wordCounts,
  };
  return wordData;
};

module.exports = {
  handleData: (dataInput) => {
    const regex = /[A-z&]+|([0-9]+.[0-9]+.[0-9]+)+/g;
    const stringMatch = dataInput.match(regex);
    return getWordData(stringMatch);
  },
};


// Previous REGEX
// [A-z-0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*[^.!,:;'"<>\s]
// const regex = /(\w*[A-z-0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+\w*)/g;
// const regex = /([A-z-0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*\s)/g;
// const regex = /[A-z-0-9&.]+/g;
