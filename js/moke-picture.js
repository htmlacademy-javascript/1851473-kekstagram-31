
function createPictures (arr) {

  const templatePicture = document.querySelector('#picture').content;
  const fragment = document.createDocumentFragment();
  const templateLink = templatePicture.querySelector('.picture');
  const pictures = document.querySelector('.pictures');


  arr.forEach((item) => {
    const element = templateLink.cloneNode(true);
    const image = element.querySelector('.picture__img');
    const like = element.querySelector('.picture__likes');
    const comment = element.querySelector('.picture__comments');
    image.src = item.url;
    image.alt = item.description;
    like.textContent = item.likes;
    comment.textContent = item.comments.length;
    fragment.appendChild(element);
  });

  pictures.appendChild(fragment);
}
export {createPictures};
