import { createEffect, createEvent, createStore } from 'effector';
import Cookies from 'js-cookie';
import UserApi from '@/lib/api/user';
import { resolve } from '@/lib/utils';
import type { IUser } from '@server/models/User';

export type UserStoreType = IUser | null;

/* Utils */

const withUpdatedProfileImage = (state: UserStoreType) => {
  if (state && state?.profileImage) {
    return { ...state, profileImage: resolve(import.meta.env.VITE_API_URL, state.profileImage) };
  }

  return state;
};

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

const $user = createStore<UserStoreType>(null);

$user.on(fetchUserProfileFx.doneData, (_, fetchedUser) => {
  return withUpdatedProfileImage(fetchedUser);
});

$user.on(updateUserEvent, (state, payload) => {
  return withUpdatedProfileImage(state ? { ...state, ...payload } : (payload as IUser));
});

$user.reset(resetUserEvent);

export default $user;
