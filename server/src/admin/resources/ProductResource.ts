import type { ResourceWithOptions } from 'adminjs';
import Product from '../../models/Product.js';

const ProductResource: ResourceWithOptions = {
  resource: Product,
  options: {
    titleProperty: 'name',
    listProperties: ['_id', 'name', 'type', 'price', 'style', 'public'],
    editProperties: ['name', 'type', 'price', 'style', 'gender', 'discount', 'articleNumber', 'public'],
  },
};

export default ProductResource;
