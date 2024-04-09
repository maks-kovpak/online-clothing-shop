import { Rate } from '@/ui';
import { Flex, Tag } from 'antd';
import type { FullProduct } from '@server/lib/types/models';
import type { Dispatch, FC, SetStateAction } from 'react';
import ColorTags from '@/components/features/ColorTags';

const ProductInfo: FC<{
  product: FullProduct;
  setOption: Dispatch<SetStateAction<number>>;
}> = ({ product, setOption }) => {
  return (
    <div className="detailed-product-info">
      <h2>{product.name}</h2>

      <Flex gap="0.5rem" align="center">
        <Rate defaultValue={product.averageRating ?? 5} disabled />
        <span className="rating-value" style={{ display: 'block' }}>
          <span style={{ color: 'black' }}>{product.averageRating ?? 5}</span>/5
        </span>
      </Flex>

      {product?.discount ? (
        <Flex gap="0.5rem" align="center">
          <p className="price">₴{product.price}</p>
          <p className="old-price">₴{product.initialPrice}</p>
          <Tag color="red">-{product.discount}%</Tag>
        </Flex>
      ) : (
        <p className="price">₴{product.price}</p>
      )}

      <ColorTags
        items={product.options.filter((option) => option.isAvailable).map((option) => option.color)}
        onSelect={(_, idx) => setOption(idx)}
      />
    </div>
  );
};

export default ProductInfo;
