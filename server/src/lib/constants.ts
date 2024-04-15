export const ALLOWED_MIME_TYPES = [
  'image/apng',
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
];

export const AVATARS_IMAGES_PATH = '/upload/avatars/';

/* Regular expressions */

export const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const USERNAME_REGEX = /[a-z0-9]+(?:-[a-z0-9]+)*/;
export const HEX_COLOR_REGEX = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
