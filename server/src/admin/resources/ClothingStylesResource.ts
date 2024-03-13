import { ResourceWithOptions } from 'adminjs';
import ClothingStyles from '../../models/ClothingStyles.js';

const ClothingStylesResource: ResourceWithOptions = {
  resource: ClothingStyles,
  options: {
    listProperties: ['_id', 'name'],
    showProperties: ['_id', 'name'],
    editProperties: ['name'],
    filterProperties: ['_id', 'name'],
  },
};

export default ClothingStylesResource;
