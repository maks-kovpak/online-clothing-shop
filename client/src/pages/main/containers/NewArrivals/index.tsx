import { useEffect, useState } from 'react';
import type { FullProduct } from '@server/lib/types/models';
import ProductsApi from '@/lib/api/products';
import ProductsList from '@/components/features/ProductsList';

const NewArrivals = () => {
  const [products, setProducts] = useState<FullProduct[]>([]);

  useEffect(() => {
    ProductsApi.getAll().then((response) => setProducts(response.data));
  }, []);

  return (
    <section className="primary-section section-top-margin">
      <ProductsList products={products} />
    </section>
  );
};

export default NewArrivals;
