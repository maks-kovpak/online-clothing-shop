import { Outlet, useSearchParams, useLocation } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/layout/PageHeader';
import PageFooter from '@/components/layout/PageFooter';
import Loading from '@/components/layout/Loading';
import { fetchUserProfileFx } from '@/stores/user.store';
import { fetchCartFx } from '@/stores/cart.store';

const App = () => {
  const { t } = useTranslation();
  const fetchAuthorizedUser = useUnit(fetchUserProfileFx);
  const fetchCart = useUnit(fetchCartFx);
  const [params, setParams] = useSearchParams();
  const { pathname } = useLocation();

  // Scroll to top when the location has been changed
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  // Get the authorized user data
  useEffect(() => {
    fetchAuthorizedUser();
  }, [fetchAuthorizedUser]);

  // Get the user cart
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Handling an error coming from search params
  useEffect(() => {
    const errorMessage = params.get('error');
    const key = 'params-error';

    if (errorMessage) {
      message.open({
        key,
        type: 'error',
        content: t(errorMessage),
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
  }, [params, setParams, t]);

  return (
    <Loading>
      <PageHeader />
      <Outlet />
      <PageFooter />
    </Loading>
  );
};

export default App;
