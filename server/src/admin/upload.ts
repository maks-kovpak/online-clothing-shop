import uploadFileFeature, { type LocalUploadOptions } from '@adminjs/upload';
import type { ResourceWithOptions } from 'adminjs';
import componentLoader from './componentLoader.js';
import Files from '../models/Files.js';
import { ALLOWED_MIME_TYPES } from '../lib/constants.js';

const localProvider: LocalUploadOptions = {
  bucket: 'public/upload',
  opts: {
    baseUrl: '/upload',
  },
};

export const FilesResource: ResourceWithOptions = {
  resource: Files,
  options: {
    properties: {
      bucket: { type: 'string' },
      mime: { type: 'string', isArray: true },
      comment: { type: 'textarea', isSortable: false },
    },
  },
  features: [
    uploadFileFeature({
      componentLoader,
      provider: { local: localProvider },
      validation: { mimeTypes: ALLOWED_MIME_TYPES },
      multiple: true,
      properties: {
        key: '_id',
        bucket: 'bucket',
        mimeType: 'mimeType',
      },
    }),
  ],
};
