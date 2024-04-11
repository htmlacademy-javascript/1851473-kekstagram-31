import {isEscapeKey} from '../util.js';
import {clearForm} from './validate-form.js';
import {changeSizeImage, removeSizeImage} from './change-size-image.js';
import {filterRangeSlider, removeFilterRangeSlider} from './create-slider.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const btnDownloaderImgNode = document.querySelector('.img-upload__input');
const btnCloseFilterImgNode = document.querySelector('.img-upload__cancel');
const imagePreviewNode = document.querySelector('.img-upload__preview img');
const effectsImagePreviewNode = document.querySelectorAll('.effects__preview');
const imgUploadOverlayNode = document.querySelector('.img-upload__overlay');
const bodyNode = document.querySelector('body');

function openPopupForm () {
  btnDownloaderImgNode.addEventListener('change', () => {
    const file = btnDownloaderImgNode.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      imagePreviewNode.src = URL.createObjectURL(file);
      effectsImagePreviewNode.forEach((pictures) => {
        pictures.style.backgroundImage = `url(${imagePreviewNode.src})`;
      });
    }
    imgUploadOverlayNode.classList.remove('hidden');
    bodyNode.classList.add('modal-open');
    document.addEventListener('keydown', escKeydownHandler);
    btnCloseFilterImgNode.addEventListener('click', btnCloseFilterImgClickHandler);
    changeSizeImage();
    filterRangeSlider();
  });
}

function closeFilterImg () {
  imgUploadOverlayNode.classList.add('hidden');
  bodyNode.classList.remove('modal-open');
  document.removeEventListener('keydown', escKeydownHandler);
  btnCloseFilterImgNode.removeEventListener('click', btnCloseFilterImgClickHandler);
  btnDownloaderImgNode.value = '';
  removeSizeImage();
  removeFilterRangeSlider();
  clearForm();
}

function btnCloseFilterImgClickHandler () {
  closeFilterImg();
}

function escKeydownHandler (evt) {
  const modalErrorNode = document.querySelector('.error');
  if (isEscapeKey(evt) && !modalErrorNode) {
    evt.preventDefault();
    closeFilterImg();
  }
}

export {openPopupForm, closeFilterImg};

