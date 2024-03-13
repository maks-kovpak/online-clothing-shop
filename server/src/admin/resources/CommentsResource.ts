import type { ResourceWithOptions } from 'adminjs';
import Comments from '../../models/Comments.js';

const CommentsResource: ResourceWithOptions = {
  resource: Comments,
  options: {
    listProperties: ['productId', 'rating', 'text', 'createdAt'],
    editProperties: ['productId', 'userId', 'rating', 'text'],
  },
};

export default CommentsResource;
