import ProductsApi from '@/lib/api/products';
import { Gender } from '@server/lib/enums';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import NotFoundPage from '@/pages/notFound';
import ProductsList from '@/components/features/ProductsList';
import { useEffect } from 'react';

type PageQueryParams = {
  gender: Lowercase<Gender.MAN> | Lowercase<Gender.WOMAN>;
  type: string;
};

const genderSlugAllowedValues = [Gender.MAN.toLowerCase(), Gender.WOMAN.toLowerCase()];

const ShopPage = () => {
  const { gender, type } = useParams() as PageQueryParams;
  const pathname = useLocation();

  const { data: products, refetch: refetchProducts } = useQuery({
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

  if (!genderSlugAllowedValues.includes(gender)) {
    return <NotFoundPage />;
  }

  if (!products) return 'Loading...';

  return <ProductsList products={products} />;
};

export default ShopPage;
