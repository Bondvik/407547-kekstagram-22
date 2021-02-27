import {getPublicPhotos} from './data.js';
import {createPicture} from './create-picture.js';
import {openUploadModal} from './upload-form.js';

createPicture(getPublicPhotos());
openUploadModal();
