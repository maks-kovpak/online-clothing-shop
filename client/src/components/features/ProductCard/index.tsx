import { Flex, Tag } from 'antd';
import { Rate } from '@/ui';
import { type FC, useMemo, Suspense } from 'react';
import { FullProduct } from '@server/lib/types/models';
import { UPLOAD_URL } from '@/lib/constants';
import ProductCardSkeleton from '../ProductCardSkeleton';
import { Link, generatePath } from 'react-router-dom';
import paths from '@/lib/paths';
import join from 'url-join';

import './index.scss';

const ProductCard: FC<{ product: FullProduct }> = ({ product }) => {
  const imageUrl = useMemo(() => {
    return join(UPLOAD_URL, product.options[0].images[0]);
  }, [product.options]);

  return (
    <Suspense fallback={<ProductCardSkeleton />}>
      <Link className="product-card" to={generatePath(paths.productDetails, { id: product._id.toString() })}>
        <img src={imageUrl} alt={product.name} />

        <Flex className="product-info" dir="column" gap="0.5rem" vertical>
          <h3>{product.name}</h3>

          <Flex gap="0.5rem" align="center">
            <Rate defaultValue={product.averageRating ?? 5} disabled />
            <span className="rating-value">
              <span style={{ color: 'black' }}>{product.averageRating ?? 5}</span>/5
            </span>
          </Flex>

          {product?.discount ? (
            <Flex gap="0.5rem" align="center">
              <p className="price">₴{Math.round(product.price * (1 - product.discount / 100))}</p>
              <p className="old-price">₴{product.price}</p>
              <Tag color="red">-{product.discount}%</Tag>
            </Flex>
          ) : (
            <p className="price">₴{product.price}</p>
          )}
        </Flex>
      </Link>
    </Suspense>
  );
};

export default ProductCard;
