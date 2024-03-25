import ProductsApi from '@/lib/api/products';
import { Gender } from '@server/lib/enums';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import NotFoundPage from '@/pages/notFound';
import ProductsList from '@/components/features/ProductsList';

type PageQueryParams = {
  gender: Lowercase<Gender.MAN> | Lowercase<Gender.WOMAN>;
};

const genderAllowedValue = [Gender.MAN.toLowerCase(), Gender.WOMAN.toLowerCase()];

const ShopPage = () => {
  const { gender } = useParams() as PageQueryParams;

  const { data: products } = useQuery({
    queryKey: ['shop'],
    queryFn: async () => {
      const response = await ProductsApi.getAll({
        gender: gender.toUpperCase(),
        sortBy: 'createdAt',
      });

      return response.data;
    },
  });

  if (!genderAllowedValue.includes(gender)) {
    return <NotFoundPage />;
  }

  if (!products) return 'Loading...';

  return <ProductsList products={products} />;
};

export default ShopPage;
