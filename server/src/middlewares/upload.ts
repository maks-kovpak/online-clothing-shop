import path from 'path';
import { fileURLToPath } from 'url';
import multer, { Options } from 'multer';
import { ALLOWED_MIME_TYPES, AVATARS_IMAGES_PATH } from '../lib/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../public' + AVATARS_IMAGES_PATH));
  },

  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  },
});

const fileFilter: Options['fileFilter'] = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default multer({ storage, fileFilter });
