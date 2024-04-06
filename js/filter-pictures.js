import {createRandomIdFromRangeGenerator, debounce} from './util.js';
import {createPictures} from './create-pictures.js';

const MIN_RANDOM_NUMBER = 0;
const MAX_RANDOM_NUMBER = 24;
const RERENDER_DELAY = 500;
const btnFilterDefoult = document.querySelector('#filter-default');
const btnFilterRandom = document.querySelector('#filter-random');
const btnFilterDiscussed = document.querySelector('#filter-discussed');
const setActiveBtn = (currentBtn) => {
  const activeBtn = document.querySelector('.img-filters__button--active');
  if (currentBtn !== activeBtn) {
    activeBtn.classList.remove('img-filters__button--active');
    currentBtn.classList.add('img-filters__button--active');
  }
};

const sortByComments = function (a, b) {
  return b.comments.length - a.comments.length;
};

const randomeFilter = function (pictures) {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  btnFilterRandom.addEventListener('click', () => {
    setActiveBtn(btnFilterRandom);
    const pictureCollection = document.querySelectorAll('.picture');
    for (let i = 0; i < pictureCollection.length; i++) {
      pictureCollection[i].remove();
    }
    const randomPictures = createRandomNoRepatFilter(pictures);
    debounce(
      () => {
        createPictures(randomPictures);
      },
      RERENDER_DELAY,
    );
  });

  btnFilterDiscussed.addEventListener('click', () => {
    setActiveBtn(btnFilterDiscussed);
    const pictureCollection = document.querySelectorAll('.picture');
    for (let i = 0; i < pictureCollection.length; i++) {
      pictureCollection[i].remove();
    }
    const sortPictures = pictures.slice(0).sort(sortByComments);
    debounce(
      () => {
        createPictures(sortPictures);
      },
      RERENDER_DELAY,
    );
  });
  btnFilterDefoult.addEventListener('click', () => {
    setActiveBtn(btnFilterDefoult);
    const pictureCollection = document.querySelectorAll('.picture');
    for (let i = 0; i < pictureCollection.length; i++) {
      pictureCollection[i].remove();
    }
    debounce(
      () => {
        createPictures(pictures);
      },
      RERENDER_DELAY,
    );
  });
};

function createRandomNoRepatFilter (pictures) {
  const randomNoRepeat = createRandomIdFromRangeGenerator(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER);
  const newPictures = [];
  for (let i = 0; i < 10; i++) {
    const randomNumber = randomNoRepeat();
    newPictures.push(pictures[randomNumber]);
  }
  return newPictures;
}

export {randomeFilter};
