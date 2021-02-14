import {getRandomNumber} from './util.js';

let allData = null;

const Photos = {
  TOTAL: 25,
};
const Likes = {
  MIN: 15,
  MAX: 200,
};
const Comments = {
  MIN: 0,
  MAX: 10,
};

const descriptions = [
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

const names = [
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


const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];


const getRandomElement = function (elemets) {
  return elemets[getRandomNumber(0, elemets.length - 1)];
};

const getPhoto = function (index) {
  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: getRandomElement(descriptions),
    likes: getRandomNumber(Likes.MIN, Likes.MAX),
    comments: getPhotoComments(),
  }
};

const getComment = function(index) {
  return {
    id: index,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomElement(messages),
    name: getRandomElement(names),
  }
};

const getPhotoComments = function () {
  let commentsTotal = getRandomNumber(Comments.MIN, Comments.MAX);
  return new Array(commentsTotal).fill(null).map((item, index) => getComment(index + 1))
};

const getPublicPhotos = function () {
  allData = new Array(Photos.TOTAL).fill(null).map((item, index) => getPhoto(index + 1));
  return allData;
};

const getElement = (id) => {
  return allData[id];
}

export {getPublicPhotos, getElement};
