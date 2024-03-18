import {openPopup} from './popup-big-picture.js'

function createPictures (arr) {

  const templatePicture = document.querySelector('#picture').content;
  const fragment = document.createDocumentFragment();
  const templateLink = templatePicture.querySelector('.picture');
  const pictures = document.querySelector('.pictures');


  arr.forEach((item) => {
    const elementLink = templateLink.cloneNode(true);
    elementLink.addEventListener('click', function() {
      openPopup(item);
    })
    const image = elementLink.querySelector('.picture__img');
    const like = elementLink.querySelector('.picture__likes');
    const comment = elementLink.querySelector('.picture__comments');
    image.src = item.url;
    image.alt = item.description;
    like.textContent = item.likes;
    comment.textContent = item.comments.length;
    fragment.appendChild(elementLink);
  });

  pictures.appendChild(fragment);
}
export {createPictures};
