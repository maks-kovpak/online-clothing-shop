import path from 'path';
import { fileURLToPath } from 'url';
import multer, { Options } from 'multer';
import { ALLOWED_MIME_TYPES } from '../lib/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../public/upload/avatars/'));
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + new Date().toISOString());
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
