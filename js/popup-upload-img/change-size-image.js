const STEP = 25;
const btnSmallSize = document.querySelector('.scale__control--smaller');
const btnBigSize = document.querySelector('.scale__control--bigger');
const sizeInput = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');



function onSizeImage () {
  btnBigSize.addEventListener('click', onBtnBig);
  btnSmallSize.addEventListener('click', onBtnSmall );
};

function onBtnBig () {
  let inputValue = Number(sizeInput.value.replace('%', ''));
  inputValue += STEP;
  if (inputValue > 100) {
    inputValue = 100;
  }
  sizeInput.value = inputValue + '%';

  imgUploadPreview.style.transform = `scale(${inputValue / 100})`;
};

function onBtnSmall () {
  let inputValue = Number(sizeInput.value.replace('%', ''));
  inputValue -= STEP;
  if (inputValue < 25) {
    inputValue = 25;
  }
  sizeInput.value = inputValue + '%';

  imgUploadPreview.style.transform = `scale(${inputValue / 100})`;
};

function removeSizeImage () {
  btnSmallSize.removeEventListener('click', onBtnSmall);
  btnBigSize.removeEventListener('click', onBtnBig);
  imgUploadPreview.style.transform = '';
};

export {onSizeImage, removeSizeImage};


