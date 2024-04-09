import type { FullProduct } from '@server/lib/types/models';
import type { Dispatch, FC, SetStateAction } from 'react';
import ColorTags from '@/components/features/ColorTags';
import ProductPrice from '@/components/features/ProductPrice';
import ProductRating from '@/components/features/ProductRating';

const ProductInfo: FC<{
  product: FullProduct;
  setOption: Dispatch<SetStateAction<number>>;
}> = ({ product, setOption }) => {
  return (
    <div className="detailed-product-info">
      <h2>{product.name}</h2>
      <ProductRating value={product.averageRating} />
      <ProductPrice value={product.price} oldPrice={product.initialPrice} discount={product.discount} />

      <ColorTags
        items={product.options.filter((option) => option.isAvailable).map((option) => option.color)}
        onSelect={(_, idx) => setOption(idx)}
      />
    </div>
  );
};

export default ProductInfo;
