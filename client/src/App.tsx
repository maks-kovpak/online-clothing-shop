import { Outlet } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Loading from '@/components/layout/Loading';
import { fetchUserProfileFx } from '@/stores/user.store';

const App = () => {
  const fetchAuthorizedUser = useUnit(fetchUserProfileFx);

  useEffect(() => {
    fetchAuthorizedUser();
  }, [fetchAuthorizedUser]);

  return (
    <Loading>
      <PageHeader />
      <Outlet />
    </Loading>
  );
};

export default App;
