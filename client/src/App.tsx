import { Outlet, useSearchParams } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { message } from 'antd';
import PageHeader from '@/components/layout/PageHeader';
import Loading from '@/components/layout/Loading';
import { fetchUserProfileFx } from '@/stores/user.store';

const App = () => {
  const fetchAuthorizedUser = useUnit(fetchUserProfileFx);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    fetchAuthorizedUser();
  }, [fetchAuthorizedUser]);

  // Handling an error coming from search params
  useEffect(() => {
    const errorMessage = params.get('error');
    const key = 'params-error';

    if (errorMessage) {
      message.open({
        key,
        type: 'error',
        content: errorMessage,
        duration: 2,
        onClose: () => {
          if (params.has('error', errorMessage)) {
            setParams((prev) => {
              prev.delete('error');
              return prev;
            });
          }
        },
      });
    }

    return () => message.destroy(key);
  }, [params, setParams]);

  return (
    <Loading>
      <PageHeader />
      <Outlet />
    </Loading>
  );
};

export default App;
