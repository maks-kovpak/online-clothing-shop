import { Flex } from 'antd';
import { FC, useMemo, Suspense } from 'react';
import { FullProduct } from '@server/lib/types/models';
import { UPLOAD_URL } from '@/lib/constants';
import { Link, generatePath } from 'react-router-dom';
import paths from '@/lib/paths';
import join from 'url-join';

import ProductCardSkeleton from '../ProductCardSkeleton';
import ProductPrice from '../ProductPrice';
import ProductRating from '../ProductRating';

import './index.scss';

export type ProductCartCompoundedComponent = {
  Skeleton: typeof ProductCardSkeleton;
};

const ProductCard: FC<{ product: FullProduct }> & ProductCartCompoundedComponent = ({ product }) => {
  const imageUrl = useMemo(() => {
    return join(UPLOAD_URL, product.options[0].images[0]);
  }, [product.options]);

  return (
    <Suspense fallback={<ProductCardSkeleton />}>
      <Link className="product-card" to={generatePath(paths.productDetails, { id: product._id })}>
        <img src={imageUrl} alt={product.name} />

        <Flex className="product-info" dir="column" gap="0.5rem" vertical>
          <h3>{product.name}</h3>
          <ProductRating value={product.averageRating} />
          <ProductPrice value={product.price} oldPrice={product.initialPrice} discount={product.discount} />
        </Flex>
      </Link>
    </Suspense>
  );
};

ProductCard.Skeleton = ProductCardSkeleton;

export default ProductCard;
