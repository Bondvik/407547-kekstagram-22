import {getPublicPhotos} from './data.js';
import {createPicture} from './create-picture.js';
import {openUploadModal} from './upload-image.js';

createPicture(getPublicPhotos());
openUploadModal();
