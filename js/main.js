import { getArrayPictures } from './object-pictures.js';
import { createPictures } from './moke-picture.js';
import {onOpenPopupForm} from './filter-popup.js';
import { onFormSubmit } from './validate-form.js';

createPictures(getArrayPictures());
onOpenPopupForm();
onFormSubmit();


