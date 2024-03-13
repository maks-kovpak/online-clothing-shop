import type { ResourceWithOptions } from 'adminjs';
import ClothingTypes from '../../models/ClothingTypes.js';

const ClothingTypesResource: ResourceWithOptions = {
  resource: ClothingTypes,
  options: {
    listProperties: ['_id', 'name'],
    showProperties: ['_id', 'name'],
    editProperties: ['name'],
    filterProperties: ['_id', 'name'],
  },
};

export default ClothingTypesResource;
