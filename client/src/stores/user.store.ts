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
export const resetUserEvent = createEvent();

/* Store */

const $user = createStore<IUserStore | null>(null);

$user.on(fetchUserProfileFx.doneData, (_, fetchedUser) => {
  return fetchedUser;
});

$user.on(updateUserEvent, (state, payload) => {
  return state ? { ...state, ...payload } : (payload as IUser);
});

$user.reset(resetUserEvent);

export default $user;
