import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FullProduct } from '@server/lib/types/models';
import ProductsApi from '@/lib/api/products';
import ProductsList from '@/components/features/ProductsList';
import { Button } from '@/ui';
import { Flex, Divider } from 'antd';

import './index.scss';

const NewArrivals = () => {
  const [products, setProducts] = useState<FullProduct[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    ProductsApi.getAll({
      sortBy: 'createdAt',
      sortOrder: 'descending',
      limit: '4',
    }).then((response) => setProducts(response.data));
  }, []);

  return (
    <section className="primary-section section-top-margin new-arrivals-section">
      <ProductsList products={products} />

      <Flex justify="center" style={{ marginBottom: '4rem' }}>
        <Button size="large" style={{ minWidth: 150 }}>
          {t('VIEW_ALL')}
        </Button>
      </Flex>

      <Divider />
    </section>
  );
};

export default NewArrivals;
