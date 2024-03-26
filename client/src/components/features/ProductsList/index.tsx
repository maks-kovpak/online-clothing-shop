import type { FC } from 'react';
import type { FullProduct } from '@server/lib/types/models';
import ProductCard from '@/components/features/ProductCard';
import ProductCardSkeleton from '@/components/features/ProductCardSkeleton';

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
  if (pending || !products) return <ProductsListSkeleton />;

  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductCard key={product._id.toString()} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
