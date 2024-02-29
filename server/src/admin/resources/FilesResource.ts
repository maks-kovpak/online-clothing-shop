import uploadFileFeature, { type LocalUploadOptions } from '@adminjs/upload';
import type { ResourceWithOptions } from 'adminjs';
import componentLoader from '../componentLoader.js';
import Files from '../../models/Files.js';
import { ALLOWED_MIME_TYPES } from '../../lib/constants.js';

const localProvider: LocalUploadOptions = {
  bucket: 'public/upload',
  opts: {
    baseUrl: '/upload',
  },
};

const FilesResource: ResourceWithOptions = {
  resource: Files,
  options: {
    properties: {
      key: { type: 'string', isArray: true },
      bucket: { type: 'string', isArray: true },
      mime: { type: 'string', isArray: true },
      comment: { type: 'textarea', isSortable: false },
    },
    listProperties: ['_id', 'file', 'mime', 'bucket', 'comment', 'createdAt'],
    editProperties: ['file', 'comment'],
  },
  features: [
    uploadFileFeature({
      componentLoader,
      provider: { local: localProvider },
      validation: { mimeTypes: ALLOWED_MIME_TYPES },
      multiple: true,
      properties: {
        key: 'key',
        bucket: 'bucket',
        mimeType: 'mime',
      },
    }),
  ],
};

export default FilesResource;
