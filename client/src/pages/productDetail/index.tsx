import MetaTags from '@/components/features/MetaTags';
import ProductsApi from '@/lib/api/products';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import NotFoundPage from '@/pages/notFound';
import Breadcrumbs from '@/components/features/Breadcrumbs';
import { Flex } from 'antd';
import { useState } from 'react';
import { ProductImagesGallery, ProductImagesGallerySkeleton } from './containers/ProductImagesGallery';
import ProductInfo from './containers/ProductInfo';
import ProductReviews from './containers/ProductReviews';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [currentOption, setCurrentOption] = useState<number>(0);

  const { data: product, isPending } = useQuery({
    queryKey: ['productDetail'],
    queryFn: async () => {
      if (!id) return;

      const response = await ProductsApi.getOne(id);
      return response.data;
    },
  });

  if (!isPending && !product) return <NotFoundPage />;

  return (
    <>
      {!isPending && <MetaTags title={`${product!.name} | SHOP.CO`} description={product!.description} />}

      <main className="product-details-page">
        <section className="primary-section breadcrumbs-section">
          <Breadcrumbs />
        </section>

        <section className="main-product-info primary-section">
          <Flex gap="2.5rem">
            {isPending ? (
              <ProductImagesGallerySkeleton />
            ) : (
              <ProductImagesGallery productOption={product!.options[currentOption]} />
            )}

            <ProductInfo product={product} option={currentOption} setOption={setCurrentOption} pending={isPending} />
          </Flex>
        </section>

        <ProductReviews productId={id} />
      </main>
    </>
  );
};

export default ProductDetailPage;
