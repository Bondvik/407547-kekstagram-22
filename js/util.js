const COMMENT_LENGTH = 140;
const getMaxLengthComment = function (comment) {
  return (comment.length < COMMENT_LENGTH) ? true : false;
};

//Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomNumber = function(min, max) {
  let minValue =  Math.ceil(min);
  let maxValue = Math.floor(max);
  if (min < 0 || max < 0) {
    return;
  }
  if (min === max) {
    return min;
  }
  if (min > max) {
    minValue = Math.ceil(max);
    maxValue = Math.floor(min);
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};
export {getRandomNumber, getMaxLengthComment};
