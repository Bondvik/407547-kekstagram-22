const COMMENT_LENGTH = 140;
const PHOTOS_TOTAL = 25;
const LIKES = {
  min: 15,
  max: 200,
}

const COMMENTS = {
  min: 0,
  max: 10,
}

const DESCRIPTIONS = [
  'Обожаю валяться на пляже!',
  'Вот в таком чудесном настроении, я придумываю новые идеи и проекты',
  'Делюсь тем, от чего кайфую',
  'Утопаю в тёплых воспоминаниях',
  'Есть места где особенно приятно работать',
  'Искать необычное в обычном. Это и есть жить каждый день',
  'А здесь оказывается не только море с нежным песком, но и холмы с утёсами',
  'Эмоциональные батарейки заряжаются от водоёмов, гор, лесов, звуков живности, общения с близкими людьми..',
  'Понимаю почему многие сюда возвращаются... Магично',
  'Ну просто нереальная красота!',
];

const NAMES = [
  'Ольга',
  'Андрей',
  'Лиля',
  'Виктор',
  'Анастасия',
  'Леонид',
  'Дарина',
  'Наталья',
  'Алексей',
  'Марина',
  'Ира',
  'Александр',
  'Влад',
];


const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

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

getMaxLengthComment('absd');

const getRandomArrayElement = function (elemets) {
  return elemets[getRandomNumber(0, elemets.length - 1)];
}

const createPhoto = function (index) {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(LIKES.min, LIKES.max),
    comments: photoComments(),
  }
}

const createComment = function(index) {
  return {
    id: index + 1,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }

}

const photoComments = function () {
  let commentsTotal = getRandomNumber(COMMENTS.min, COMMENTS.max);
  if (commentsTotal !== 0) {
    return new Array(commentsTotal).fill(null).map((item, index) => createComment(index))
  } else {
    return 0;
  }
}


const puplicPhotos = function () {
  return new Array(PHOTOS_TOTAL).fill(null).map((item, index) => createPhoto(index));
}

puplicPhotos();
