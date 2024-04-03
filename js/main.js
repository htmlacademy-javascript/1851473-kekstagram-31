import {onOpenPopupForm} from './popup-upload-img/filter-popup.js';
import {showErrorMessage} from './function-remote-server.js';
import {getData} from './api.js';
import {createPictures} from './create-pictures.js';
import {formSubmit} from './popup-upload-img/validate-form.js';
import {closeFilterImg} from './popup-upload-img/filter-popup.js';


getData()
  .then((pictures) => createPictures(pictures))
  .catch(() => {
    showErrorMessage();
  });
onOpenPopupForm();

formSubmit(closeFilterImg);
