import {isEscapeKey} from '../util.js';
import {onFormSubmit} from './validate-form.js';
import {onSizeImage} from './change-size-image.js';
import {filterRangeSlider} from './create-slider.js';

let btnDownloaderImg = document.querySelector('.img-upload__input');
let btnCloseFilterImg = document.querySelector('.img-upload__cancel');

function onOpenPopupForm () {
  btnDownloaderImg.addEventListener('change', function() {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', handlerEscKeydown);
    btnCloseFilterImg.addEventListener('click', closeFilterImg);
    onFormSubmit();
    onSizeImage();
    filterRangeSlider();
  })
};

function closeFilterImg () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', handlerEscKeydown);
  btnCloseFilterImg.removeEventListener('click', closeFilterImg);
  btnDownloaderImg.value = '';
};

function handlerEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFilterImg();
  }
};

export {onOpenPopupForm};

