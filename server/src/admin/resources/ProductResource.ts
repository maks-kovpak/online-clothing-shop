import { ResourceWithOptions } from 'adminjs';
import Product from '../../models/Product.js';

const ProductResource: ResourceWithOptions = {
  resource: Product,
  options: {
    titleProperty: 'name',
    listProperties: ['_id', 'name', 'type', 'price', 'style', 'public'],
  },
};

export default ProductResource;
