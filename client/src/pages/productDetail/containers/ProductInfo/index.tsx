import type { FullProduct } from '@server/lib/types/models';
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import ColorTags from '@/components/features/ColorTags';
import ProductPrice from '@/components/features/ProductPrice';
import ProductRating from '@/components/features/ProductRating';
import { Divider, Skeleton, Radio, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import { Button, InputNumber } from '@/ui';
import { useEffect, useState } from 'react';
import { ClothingSize } from '@server/lib/enums';
import { useUnit } from 'effector-react';
import { addToCartFx } from '@/stores/cart.store';

import './index.scss';

const SectionWithDivider: FC<{ children: ReactNode; title?: string }> = ({ children, title }) => {
  return (
    <div className="section-with-divider">
      <Divider />
      {title && <span className="sm-title">{title}</span>}
      <div className="content">{children}</div>
    </div>
  );
};

const ProductInfo: FC<{
  product: FullProduct | undefined;
  option: number;
  setOption: Dispatch<SetStateAction<number>>;
  pending?: boolean;
}> = ({ product, option, setOption, pending }) => {
  const { t } = useTranslation();
  const [addToCart, addToCartPending] = useUnit([addToCartFx, addToCartFx.pending]);
  const [size, setSize] = useState<ClothingSize>();
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    if (!product) return;
    setSize(product.options[option].size[0]);
  }, [option, product]);

  if (pending || !product) {
    return <Skeleton paragraph={{ rows: 4 }} active />;
  }

  return (
    <div className="detailed-product-info">
      <h2>{product.name}</h2>
      <ProductRating value={product.averageRating} />
      <ProductPrice value={product.price} oldPrice={product.initialPrice} discount={product.discount} />
      <p className="description">{product.description}</p>

      <SectionWithDivider title={t('SELECT_COLOR')}>
        <ColorTags
          items={product.options.filter((option) => option.isAvailable).map((option) => option.color)}
          onSelect={(_, idx) => setOption(idx)}
        />
      </SectionWithDivider>

      <SectionWithDivider title={t('CHOOSE_SIZE')}>
        <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
          {product.options[option].size.map((size) => (
            <Radio.Button key={size} value={size}>
              {size}
            </Radio.Button>
          ))}
        </Radio.Group>
      </SectionWithDivider>

      <SectionWithDivider>
        <Flex gap="1.25rem">
          <InputNumber min={1} initialValue={1} onChange={(val) => setCount(val)} />
          <Button
            type="primary"
            size="large"
            onClick={() =>
              addToCart({
                productOptionId: product.options[option]._id,
                count: count,
                size: size!,
              })
            }
            loading={addToCartPending}
          >
            {t('ADD_TO_CART')}
          </Button>
        </Flex>
      </SectionWithDivider>
    </div>
  );
};

export default ProductInfo;
