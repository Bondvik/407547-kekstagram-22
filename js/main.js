import {getData} from './api.js';
import {showAlert} from './util.js';
import {createPicture} from './create-picture.js';
import './upload-form.js';

getData((pictures) => {
  createPicture(pictures);
}, showAlert);
