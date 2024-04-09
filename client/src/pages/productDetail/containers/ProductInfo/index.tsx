import { Rate } from '@/ui';
import { Flex } from 'antd';
import type { FullProduct } from '@server/lib/types/models';
import type { Dispatch, FC, SetStateAction } from 'react';
import ColorTags from '@/components/features/ColorTags';
import ProductPrice from '@/components/features/ProductPrice';

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

      <ProductPrice value={product.price} oldPrice={product.initialPrice} discount={product.discount} />

      <ColorTags
        items={product.options.filter((option) => option.isAvailable).map((option) => option.color)}
        onSelect={(_, idx) => setOption(idx)}
      />
    </div>
  );
};

export default ProductInfo;
