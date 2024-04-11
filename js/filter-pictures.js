import {createRandomIdFromRangeGenerator, debounce} from './util.js';
import {createPictures} from './create-pictures.js';

const MIN_RANDOM_NUMBER = 0;
const MAX_RANDOM_NUMBER = 24;
const MAX_RANDOM_PICTURE = 10;
const RERENDER_DELAY = 500;
const btnFilterDefaultNode = document.querySelector('#filter-default');
const btnFilterRandomNode = document.querySelector('#filter-random');
const btnFilterDiscussedNode = document.querySelector('#filter-discussed');
const setActiveBtn = (currentBtn) => {
  const activeBtnNode = document.querySelector('.img-filters__button--active');
  if (currentBtn !== activeBtnNode) {
    activeBtnNode.classList.remove('img-filters__button--active');
    currentBtn.classList.add('img-filters__button--active');
  }
};

const sortByComments = function (picturesA, picturesB) {
  return picturesB.comments.length - picturesA.comments.length;
};

const randomFilter = function (pictures) {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  const debouncedFilterRandom = debounce(() => {
    const picturesCollection = document.querySelectorAll('.picture');
    for (let i = 0; i < picturesCollection.length; i++) {
      picturesCollection[i].remove();
    }
    const randomPictures = createRandomNoRepeatFilter(pictures);
    createPictures(randomPictures);
  }, RERENDER_DELAY);
  btnFilterRandomNode.addEventListener('click', () => {
    setActiveBtn(btnFilterRandomNode);
    debouncedFilterRandom();
  });

  const debouncedFilterDiscussed = debounce(() => {
    const picturesCollection = document.querySelectorAll('.picture');
    for (let i = 0; i < picturesCollection.length; i++) {
      picturesCollection[i].remove();
    }
    const sortPictures = pictures.slice(0).sort(sortByComments);
    createPictures(sortPictures);
  }, RERENDER_DELAY);
  btnFilterDiscussedNode.addEventListener('click', () => {
    setActiveBtn(btnFilterDiscussedNode);
    debouncedFilterDiscussed();
  });

  const debouncedFilterDefault = debounce(() => {
    const picturesCollection = document.querySelectorAll('.picture');
    for (let i = 0; i < picturesCollection.length; i++) {
      picturesCollection[i].remove();
    }
    createPictures(pictures);
  }, RERENDER_DELAY);
  btnFilterDefaultNode.addEventListener('click', () => {
    setActiveBtn(btnFilterDefaultNode);
    debouncedFilterDefault();
  });
};

function createRandomNoRepeatFilter (pictures) {
  const randomNoRepeat = createRandomIdFromRangeGenerator(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER);
  const newPictures = [];
  for (let i = 0; i < MAX_RANDOM_PICTURE; i++) {
    const randomNumber = randomNoRepeat();
    newPictures.push(pictures[randomNumber]);
  }
  return newPictures;
}

export {randomFilter};
