import ProductsApi from '@/lib/api/products';
import { Gender } from '@server/lib/enums';
import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import NotFoundPage from '@/pages/notFound';
import ProductsList from '@/components/features/ProductsList';
import Breadcrumbs from '@/components/features/Breadcrumbs';
import { Flex } from 'antd';
import Filters from '@/components/features/Filters';

import './index.scss';

type PageQueryParams = {
  gender: Lowercase<Gender.MAN> | Lowercase<Gender.WOMAN>;
  type: string;
};

const genderSlugAllowedValues = [Gender.MAN.toLowerCase(), Gender.WOMAN.toLowerCase()];

const ShopPage = () => {
  const { gender, type } = useParams() as PageQueryParams;
  const pathname = useLocation();

  const {
    data: products,
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
      return response.data;
    },
  });

  useEffect(() => {
    refetchProducts();
  }, [refetchProducts, pathname]);

  const maxPrice = useMemo(() => {
    return products && Math.max(...products.map((product) => product.price));
  }, [products]);

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
          <Filters maxPrice={maxPrice} />
          <ProductsList products={products} pending={isPending} />
        </Flex>
      </section>
    </>
  );
};

export default ShopPage;
