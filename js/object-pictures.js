import {getRandomInteger, getRandomArrayElement} from './util.js';
const ID_MIN = 1;
const ID_MAX = 25;
const DESCRIPTIONS = ['Красиво сфоткался', 'тут я вышел неудачно', 'Тут я лохматый', 'В отпуске!'];
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COUNT_COMMENTS = 0;
const MAX_COUNT_COMMENTS = 30;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;
const MESSAGES = ['Всё отлично!', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'В целом всё неплохо. Но не всё.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Екатерина', 'Игорь', 'Юрий', 'Владлен', 'Михаил', 'Святослав', 'Ангелина'];

// генерирует случайные значения для ключей у комментариев
function createCommentObject (index) {
  let randomName = getRandomArrayElement(NAMES);
  let randomMessage = getRandomArrayElement(MESSAGES);
  let randomAvatare = getRandomInteger(MIN_AVATAR, MAX_AVATAR);
  let object = {
    id: index,
    avatar: 'img/avatar-' + randomAvatare + '.svg',
    message: randomMessage,
    name: randomName,
  };
  return object
}

  // генерирует случайные значения для ключией у фотографии
function createPictureObject (index) {
  let randomCommentsArray = Array.from({ length: getRandomInteger(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS) }, function (v, indexComment){
    return createCommentObject(indexComment + 1)
  });
  let randomDescription = getRandomArrayElement(DESCRIPTIONS);
  let randomLikes = getRandomInteger(MIN_LIKES, MAX_LIKES);
  let object = {
    id: index,
    url: 'photos/' + index + '.jpg',
    description: randomDescription,
    likes: randomLikes,
    comments: randomCommentsArray,
  };

  return object
}

// создает массив из объектов фотографии
function getArrayPictures () {
  let array = Array.from({ length: 25 }, function (v, indexPicture){
    return createPictureObject(indexPicture + 1)
  });
  return array
}
export {getArrayPictures};
