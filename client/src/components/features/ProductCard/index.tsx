import { Card, Rate } from 'antd';
import type { FC } from 'react';

import './index.scss';

const ProductCard: FC<{
  image: string;
  title: string;
  rating: number;
  price: number;
}> = ({ image, title, rating, price }) => {
  return (
    <Card cover={<img src={image} alt={title} />} hoverable style={{ width: 350 }}>
      <span>{title}</span>
      <Rate disabled defaultValue={rating} />
      <p>₴{price}</p>
    </Card>
  );
};

export default ProductCard;
