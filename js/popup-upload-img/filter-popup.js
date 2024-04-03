import {isEscapeKey} from '../util.js';
import {clearForm} from './validate-form.js';
import {onSizeImage, removeSizeImage} from './change-size-image.js';
import {filterRangeSlider, removeFilterRangeSlider} from './create-slider.js';


const btnDownloaderImg = document.querySelector('.img-upload__input');
const btnCloseFilterImg = document.querySelector('.img-upload__cancel');

function onOpenPopupForm () {
  btnDownloaderImg.addEventListener('change', () => {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', handlerEscKeydown);
    btnCloseFilterImg.addEventListener('click', closeFilterImg);
    onSizeImage();
    filterRangeSlider();
  });
}

function closeFilterImg () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', handlerEscKeydown);
  btnCloseFilterImg.removeEventListener('click', closeFilterImg);
  btnDownloaderImg.value = '';
  removeSizeImage();
  removeFilterRangeSlider();
  clearForm()
}

function handlerEscKeydown (evt) {
  const modalError = document.querySelector('.error');
  if (isEscapeKey(evt) && !modalError) {
    evt.preventDefault();
    closeFilterImg();
  }
}

export {onOpenPopupForm, closeFilterImg};

