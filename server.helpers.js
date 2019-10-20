const getWordLength = (wordArray) => {
  console.log(wordArray.length);
  const wordCounts = {};
  for (let i = wordArray.length - 1; i >= 0; i--) { // eslint-disable-line
    const word = wordArray[i];
    if (word) {
      if (wordCounts[`${word.length}`]) {
        wordCounts[`${word.length}`] += 1;
      } else {
        wordCounts[`${word.length}`] = 1;
      }
    }
  }
  console.log(wordCounts);
  return wordCounts;
};

module.exports = {
  handleData: (dataInput) => {
    const regex = /[A-z&]+|([0-9]{2}.[0-9]{2}.[0-9]{4})+/g;
    const stringMatch = dataInput.match(regex);
    getWordLength(stringMatch);
  },
};


// Previous REGEX
// [A-z-0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*[^.!,:;'"<>\s]
// const regex = /(\w*[A-z-0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+\w*)/g;
// const regex = /([A-z-0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*\s)/g;
// const regex = /[A-z-0-9&.]+/g;
