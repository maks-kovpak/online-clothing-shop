import { useTranslation } from 'react-i18next';
import ProductsApi from '@/lib/api/products';
import ProductsCarousel from '@/components/features/ProductsCarousel';
import { Button } from '@/ui';
import { Flex, Divider } from 'antd';
import { useQuery } from '@tanstack/react-query';

import './index.scss';

const NewArrivals = () => {
  const { t } = useTranslation();

  const { isPending, data: products } = useQuery({
    queryKey: ['newArrivals'],
    queryFn: async () => {
      const response = await ProductsApi.getAll({
        sortBy: 'createdAt',
        sortOrder: 'descending',
        limit: '4',
        public: 'true',
      });

      return response.data;
    },
  });

  return (
    <section className="primary-section section-top-margin new-arrivals-section">
      <h2>{t('NEW_ARRIVALS')}</h2>

      <ProductsCarousel products={products} pending={isPending} />

      <Flex justify="center" style={{ marginBottom: '4rem' }}>
        <Button size="large" style={{ minWidth: 180 }}>
          {t('VIEW_ALL')}
        </Button>
      </Flex>

      <Divider />
    </section>
  );
};

export default NewArrivals;
