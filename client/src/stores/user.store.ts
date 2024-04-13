import { createEffect, createEvent, createStore } from 'effector';
import Cookies from 'js-cookie';
import join from 'url-join';
import UserApi from '@/lib/api/user';
import type { FullUser } from '@server/lib/types/models';

type UserStore = FullUser | null;

/* Utils */

const withUpdatedProfileImage = (state: UserStore) => {
  if (state && state?.profileImage) {
    return { ...state, profileImage: join(import.meta.env.VITE_API_URL, state.profileImage) };
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

export const updateUserEvent = createEvent<Partial<FullUser>>();
export const resetUserEvent = createEvent();

/* Store */

const $user = createStore<UserStore>(null);

$user.on(fetchUserProfileFx.doneData, (_, fetchedUser) => {
  return withUpdatedProfileImage(fetchedUser);
});

$user.on(updateUserEvent, (state, payload) => {
  return withUpdatedProfileImage(state ? { ...state, ...payload } : (payload as FullUser));
});

$user.reset(resetUserEvent);

export default $user;
