import {openPopup} from './popup-big-picture.js';

function createPictures (pictures) {

  const templatePictureNode = document.querySelector('#picture').content;
  const fragment = document.createDocumentFragment();
  const templateLinkNode = templatePictureNode.querySelector('.picture');
  const wrapperPictureNode = document.querySelector('.pictures');


  pictures.forEach((picture) => {
    const elementLink = templateLinkNode.cloneNode(true);
    elementLink.addEventListener('click', () => {
      openPopup(picture);
    });
    const imageNode = elementLink.querySelector('.picture__img');
    const likeNode = elementLink.querySelector('.picture__likes');
    const commentNode = elementLink.querySelector('.picture__comments');
    imageNode.src = picture.url;
    imageNode.alt = picture.description;
    likeNode.textContent = picture.likes;
    commentNode.textContent = picture.comments.length;
    fragment.appendChild(elementLink);
  });

  wrapperPictureNode.appendChild(fragment);
}
export {createPictures};
