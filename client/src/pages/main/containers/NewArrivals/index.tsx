import { useEffect, useState } from 'react';
import { FullProduct } from '@server/controllers/ProductController';
import ProductsApi from '@/lib/api/products';
import ProductsList from '@/components/features/ProductsList';

const NewArrivals = () => {
  const [products, setProducts] = useState<FullProduct[]>([]);

  useEffect(() => {
    ProductsApi.getAll().then((response) => setProducts(response.data));
  }, []);

  return (
    <section className="primary-section">
      <ProductsList products={products} />
    </section>
  );
};

export default NewArrivals;
