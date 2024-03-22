import type { ResourceWithOptions } from 'adminjs';
import ClothingTypes from '../../models/ClothingTypes.js';

const ClothingTypesResource: ResourceWithOptions = {
  resource: ClothingTypes,
  options: {
    listProperties: ['_id', 'name', 'gender', 'slug'],
    editProperties: ['name', 'gender', 'slug'],
  },
};

export default ClothingTypesResource;
