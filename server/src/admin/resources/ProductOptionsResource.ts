import { ResourceWithOptions } from 'adminjs';
import ProductOptions from '../../models/ProductOptions.js';

const ProductOptionsResource: ResourceWithOptions = {
  resource: ProductOptions,
  options: {
    listProperties: ['_id', 'productId', 'color', 'isAvailable'],
    editProperties: ['productId', 'color', 'size', 'isAvailable', 'images'],
    properties: {
      size: {
        isSortable: true,
        isDraggable: true,
      },
    },
  },
};

export default ProductOptionsResource;
