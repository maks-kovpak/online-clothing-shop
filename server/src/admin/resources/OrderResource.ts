import type { ResourceWithOptions } from 'adminjs';
import Order from '../../models/Order.js';

const OrderResource: ResourceWithOptions = {
  resource: Order,
  options: {
    listProperties: ['_id', 'clientId', 'address', 'status', 'createdAt'],
    editProperties: ['clientId', 'address', 'status', 'items'],
    properties: {
      items: {
        isSortable: true,
        isDraggable: true,
      },
    },
  },
};

export default OrderResource;
