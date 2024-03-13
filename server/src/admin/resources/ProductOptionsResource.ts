import { ResourceWithOptions } from 'adminjs';
import ProductOptions from '../../models/ProductOptions.js';

const ProductOptionsResource: ResourceWithOptions = {
  resource: ProductOptions,
  options: {
    listProperties: ['_id', 'productId', 'color', 'isAvailable'],
  },
};

export default ProductOptionsResource;
