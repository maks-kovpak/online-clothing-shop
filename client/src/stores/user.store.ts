import { createEffect, createEvent, createStore } from 'effector';
import Cookies from 'js-cookie';
import UserApi from '@/lib/api/user';
import type { IUser } from '@server/models/User';

export interface IUserStore extends IUser {}

/* Effects */

export const fetchUserProfileFx = createEffect(async () => {
  const id = Cookies.get('user-id');
  if (!id) return null;

  const response = await UserApi.getProfile(id);
  return response.data;
});

/* Events */

export const updateUserEvent = createEvent<Partial<IUser>>();

/* Store */

const $userStore = createStore<IUserStore | null>(null);

$userStore.on(fetchUserProfileFx.doneData, (_, fetchedUser) => {
  return fetchedUser;
});

$userStore.on(updateUserEvent, (state, newUser) => {
  return state ? { ...state, ...newUser } : (newUser as IUser);
});

export default $userStore;
