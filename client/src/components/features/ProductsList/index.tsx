import { FC } from 'react';
import { FullProduct } from '@server/controllers/ProductController.ts';
import ProductCard from '@/components/features/ProductCard';
import { UPLOAD_URL } from '@/lib/constants';
import './index.scss';

const ProductsList: FC<{ products: FullProduct[] }> = ({ products }) => {
  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductCard
          key={product._id.toString()}
          image={UPLOAD_URL + product.options[0].images[0].key[0]}
          title={product.name}
          rating={5}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductsList;
