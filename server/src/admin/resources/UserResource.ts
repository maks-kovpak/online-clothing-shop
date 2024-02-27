import { ResourceWithOptions } from 'adminjs';
import User from '../../models/User.js';

const UserResource: ResourceWithOptions = {
  resource: User,
  options: {
    listProperties: ['_id', 'email', 'name', 'username', 'role', 'createdAt'],
    editProperties: ['email', 'name', 'username', 'role', 'favoritesList'],
  },
};

export default UserResource;
