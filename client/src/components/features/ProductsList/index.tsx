import type { FC } from 'react';
import type { FullProduct } from '@server/lib/types/models';
import ProductCard from '@/components/features/ProductCard';
import ProductCardSkeleton from '@/components/features/ProductCardSkeleton';
import { Empty, Flex } from 'antd';
import { useTranslation } from 'react-i18next';

import './index.scss';

const ProductsListSkeleton = () => {
  return (
    <div className="products-list">
      {Array.from({ length: 4 }, (_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
};

const ProductsList: FC<{
  products: FullProduct[] | undefined;
  pending?: boolean;
}> = ({ products, pending }) => {
  const { t } = useTranslation();

  if (pending || !products) return <ProductsListSkeleton />;

  if (!products.length)
    return (
      <Flex justify="center" align="center" className="empty-container">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('NO_DATA')} />
      </Flex>
    );

  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
