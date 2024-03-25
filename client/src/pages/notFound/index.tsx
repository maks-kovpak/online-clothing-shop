import { useTranslation } from 'react-i18next';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import MetaTags from '@/components/features/MetaTags';
import paths from '@/lib/paths';

import './index.scss';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <MetaTags title={t('NOT_FOUND_PAGE_TITLE')} description={t('NOT_FOUND_PAGE_DESCRIPTION')} />

      <main>
        <Result
          status="404"
          title="404"
          subTitle={t('NOT_FOUND_PAGE_DESCRIPTION')}
          extra={
            <Link to={paths.main}>
              <Button type="primary">{t('BACK_HOME')}</Button>
            </Link>
          }
        />
      </main>
    </>
  );
};

export default NotFoundPage;
