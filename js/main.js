import { getArrayPictures } from './object-pictures.js';
import { createPictures } from './moke-picture.js';
import {onOpenPopupForm} from './popup-upload-img/filter-popup.js';

createPictures(getArrayPictures());
onOpenPopupForm();

