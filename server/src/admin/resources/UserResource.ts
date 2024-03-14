import type { ResourceWithOptions } from 'adminjs';
import User from '../../models/User.js';

const UserResource: ResourceWithOptions = {
  resource: User,
  options: {
    listProperties: ['_id', 'email', 'name', 'role', 'createdAt'],
    editProperties: ['email', 'name', 'username', 'role', 'cart'],
    showProperties: ['_id', 'email', 'name', 'username', 'role', 'cart', 'createdAt', 'updatedAt'],
    filterProperties: ['_id', 'email', 'name', 'username', 'role', 'cart', 'createdAt', 'updatedAt'],
    properties: {
      cart: {
        isSortable: true,
        isDraggable: true,
      },
    },
  },
};

export default UserResource;
