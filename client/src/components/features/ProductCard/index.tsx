import { Card, Rate } from 'antd';
import { type FC, useMemo } from 'react';
import { FullProduct } from '@server/lib/types/models';
import { UPLOAD_URL } from '@/lib/constants';

import './index.scss';

const ProductCard: FC<{
  product: FullProduct;
}> = ({ product }) => {
  const imageUrl = useMemo(() => {
    return UPLOAD_URL + product.options[0].images[0];
  }, [product.options]);

  return (
    <Card cover={<img src={imageUrl} alt={product.name} />} className="product-card" hoverable>
      <span>{product.name}</span>

      <Rate defaultValue={product.averageRating ?? 5} disabled />
      <p>₴{product.price}</p>
    </Card>
  );
};

export default ProductCard;
