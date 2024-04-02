import {onOpenPopupForm} from './popup-upload-img/filter-popup.js';
import {showErrorMessage} from './function-remote-server.js';
import {getData} from './api.js';
import {createPictures} from './create-pictures.js';

getData()
  .then((pictures) => createPictures(pictures))
  .catch(() => {
    showErrorMessage();
  });
onOpenPopupForm();

