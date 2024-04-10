import MetaTags from '@/components/features/MetaTags';
import ProductsApi from '@/lib/api/products';
import CommentsApi from '@/lib/api/comments';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import NotFoundPage from '@/pages/notFound';
import Breadcrumbs from '@/components/features/Breadcrumbs';
import Comment from '@/components/features/Comment';
import { Button, Flex } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductImagesGallery, ProductImagesGallerySkeleton } from './containers/ProductImagesGallery';
import ProductInfo from './containers/ProductInfo';

import './index.scss';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [currentOption, setCurrentOption] = useState<number>(0);

  const { data: product, isPending } = useQuery({
    queryKey: ['productDetail'],
    queryFn: async () => {
      if (!id) return;

      const response = await ProductsApi.getOne(id);
      return response.data;
    },
  });

  const { data: comments } = useQuery({
    queryKey: ['productReviews'],
    queryFn: async () => {
      if (!id) return;

      const response = await CommentsApi.getAllForProduct(id);
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

        <section className="product-reviews primary-section">
          <Flex className="reviews-title" justify="space-between">
            <h3 className="secondary">
              {t('ALL_REVIEWS')}
              {comments && <span>({comments.length})</span>}
            </h3>

            <Button type="primary">{t('WRITE_REVIEW')}</Button>
          </Flex>

          <div className="reviews-container">
            {comments?.map((item) => <Comment key={item._id.toString()} comment={item} withPublicationDate />)}
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductDetailPage;
