import { useUnit } from 'effector-react/compat';
import $user from '@/stores/user.store.ts';

const ProfilePage = () => {
  const user = useUnit($user);
  return <main>{JSON.stringify(user)}</main>;
};

export default ProfilePage;
