import { ResourceWithOptions } from 'adminjs';
import User from '../../models/User.js';

const UserResource: ResourceWithOptions = {
  resource: User,
  options: {
    listProperties: ['_id', 'email', 'name', 'role', 'createdAt'],
    editProperties: ['email', 'name', 'username', 'role', 'favoritesList'],
    showProperties: ['_id', 'email', 'name', 'username', 'role', 'favoritesList', 'createdAt', 'updatedAt'],
    filterProperties: ['_id', 'email', 'name', 'username', 'role', 'favoritesList', 'createdAt', 'updatedAt'],
    properties: {
      favoritesList: {
        isSortable: true,
        isDraggable: true,
      },
    },
  },
};

export default UserResource;
