import MetaTags from '@/components/features/MetaTags';
import ProductsApi from '@/lib/api/products';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import NotFoundPage from '@/pages/notFound';
import Breadcrumbs from '@/components/features/Breadcrumbs';
import { Flex } from 'antd';

import ProductImagesGallery from './containers/ProductImagesGallery';
import ProductInfo from './containers/ProductInfo';

const ProductDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const { data: product, isPending } = useQuery({
    queryKey: ['productDetail'],
    queryFn: async () => {
      if (!id) return;

      const response = await ProductsApi.getOne(id);
      return response.data;
    },
  });

  if (isPending) return 'Loading...';
  else if (!product) return <NotFoundPage />;

  return (
    <>
      <MetaTags title={`${product.name} | SHOP.CO`} description={t('PRODUCT_DETAILS_PAGE_DESCRIPTION')} />

      <main className="product-details-page">
        <section className="primary-section breadcrumbs-section">
          <Breadcrumbs />
        </section>

        <section className="main-product-info primary-section">
          <Flex gap="2.5rem">
            <ProductImagesGallery product={product} />
            <ProductInfo product={product} />
          </Flex>
        </section>
      </main>
    </>
  );
};

export default ProductDetailPage;
