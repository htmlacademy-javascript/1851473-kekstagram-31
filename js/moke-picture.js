import { getArrayPictures } from './object-pictures.js';
let arrayPictures = getArrayPictures();
console.log(arrayPictures);
const templatePicture = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();
const templateLink = templatePicture.querySelector('.picture');
const pictures = document.querySelector('.pictures');


for (let i = 0; i < arrayPictures.length; i++) {
  const element = templateLink.cloneNode(true)
  const image = element.querySelector('.picture__img');
  const like = element.querySelector('.picture__likes');
  const comment = element.querySelector('.picture__comments');
  image.setAttribute('src', `${arrayPictures[i].url}`);
  image.setAttribute('alt', `${arrayPictures[i].description}`);
  like.textContent = arrayPictures[i].likes;
  comment.textContent = arrayPictures[i].comments.length
  fragment.appendChild(element)
}

pictures.appendChild(fragment);
