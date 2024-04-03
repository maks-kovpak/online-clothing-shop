import ProductsApi from '@/lib/api/products';
import { Gender } from '@server/lib/enums';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import NotFoundPage from '@/pages/notFound';
import ProductsList from '@/components/features/ProductsList';
import Breadcrumbs from '@/components/features/Breadcrumbs';
import { Flex } from 'antd';
import Filters from '@/components/features/Filters';
import { useUnit } from 'effector-react';
import { $products, setProductsEvent, setMaxPriceEvent } from '@/stores/products.store';
import { $appliedFilters } from '@/stores/filters.store';

import './index.scss';

type PageQueryParams = {
  gender: Lowercase<Gender.MAN> | Lowercase<Gender.WOMAN>;
  type: string;
};

const genderSlugAllowedValues = [Gender.MAN.toLowerCase(), Gender.WOMAN.toLowerCase()];

const ShopPage = () => {
  const { gender, type } = useParams() as PageQueryParams;
  const pathname = useLocation();

  const [products, setProducts, setMaxPrice] = useUnit([$products, setProductsEvent, setMaxPriceEvent]);
  const appliedFilters = useUnit($appliedFilters);

  const {
    data: fetchedProducts,
    refetch: refetchProducts,
    isPending,
  } = useQuery({
    queryKey: ['shop'],
    queryFn: async () => {
      const filters: Parameters<typeof ProductsApi.getAll>[0] = {
        gender: gender.toUpperCase(),
        sortBy: 'createdAt',
        sortOrder: 'descending',
      };

      if (type) filters['type.slug'] = type;

      const response = await ProductsApi.getAll(filters);
      setProducts(response.data);

      return response.data;
    },
  });

  useEffect(() => {
    if (!fetchedProducts) return;

    const maxPrice = Math.max(...fetchedProducts.map((product) => product.price));
    setMaxPrice(maxPrice);
  }, [fetchedProducts, setMaxPrice, setProducts]);

  useEffect(() => {
    refetchProducts();
  }, [refetchProducts, pathname]);

  useEffect(() => {
    if (!fetchedProducts) return;

    const filteredProducts = fetchedProducts.filter((product) => {
      const isPriceInRange = product.price >= appliedFilters.price[0] && product.price <= appliedFilters.price[1];

      return isPriceInRange;
    });

    setProducts(filteredProducts);
  }, [fetchedProducts, setProducts, appliedFilters]);

  if (!genderSlugAllowedValues.includes(gender)) {
    return <NotFoundPage />;
  }

  return (
    <>
      <section className="primary-section section-top-margin breadcrumbs-section">
        <Breadcrumbs />
      </section>

      <section className="primary-section">
        <Flex gap="1.25rem">
          <Filters />
          <ProductsList products={products} pending={isPending} />
        </Flex>
      </section>
    </>
  );
};

export default ShopPage;
