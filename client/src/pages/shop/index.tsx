import ProductsApi from '@/lib/api/products';
import { Gender } from '@server/lib/enums';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import NotFoundPage from '@/pages/notFound';
import ProductsList from '@/components/features/ProductsList';
import Breadcrumbs from '@/components/features/Breadcrumbs';
import MetaTags from '@/components/features/MetaTags';
import { Drawer, Flex, Button } from 'antd';
import Filters from '@/components/features/Filters';
import { useUnit } from 'effector-react';
import { $products, setProductsEvent, setMaxPriceEvent } from '@/stores/products.store';
import { $appliedFilters, resetFiltersEvent } from '@/stores/filters.store';
import { $clothingTypes } from '@/stores/clothing.store';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { findClosestColor } from '@/lib/utils';
import { FILTER_COlORS } from '@/lib/constants';
import { useBreakpoints } from '@/lib/hooks';

import FiltersIcon from '@/assets/icons/filters.svg?react';

import vars from '@/assets/styles/_variables.module.scss';
import './index.scss';

type PageQueryParams = {
  gender: Lowercase<Gender.MAN> | Lowercase<Gender.WOMAN>;
  type: string;
};

const genderSlugAllowedValues = [Gender.MAN.toLowerCase(), Gender.WOMAN.toLowerCase()];

const ShopPage = () => {
  const { t } = useTranslation();
  const { gender, type } = useParams() as PageQueryParams;
  const pathname = useLocation();

  const [products, setProducts, setMaxPrice] = useUnit([$products, setProductsEvent, setMaxPriceEvent]);
  const [appliedFilters, resetFilters] = useUnit([$appliedFilters, resetFiltersEvent]);
  const clothingTypes = useUnit($clothingTypes);

  /* Fetch products */

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
        public: 'true',
      };

      if (type) filters['type.slug'] = type;

      const response = await ProductsApi.getAll(filters);
      setProducts(response.data);

      return response.data;
    },
  });

  /* Filtering */

  useEffect(() => {
    if (!fetchedProducts) return;

    const maxPrice = Math.max(...fetchedProducts.map((product) => product.price));
    setMaxPrice(maxPrice);
  }, [fetchedProducts, setMaxPrice, setProducts]);

  useEffect(() => {
    resetFilters();
    refetchProducts();
  }, [refetchProducts, pathname, resetFilters]);

  useEffect(() => {
    if (!fetchedProducts) return;

    const filteredProducts = fetchedProducts.filter((product) => {
      // If the product price is between the lowest and the highest values
      const inPriceRange = product.price >= appliedFilters.price[0] && product.price <= appliedFilters.price[1];

      // If the applied styles array is empty, then choose products with any styles
      const matchedByStyles = !appliedFilters.styles.length || appliedFilters.styles.includes(product.style);

      // If the all applied sizes are in the product options
      const productSizes = _.uniq(product.options.reduce<string[]>((acc, item) => [...acc, ...item.size], []));
      const missingAppliedSizes = _.difference(appliedFilters.sizes, productSizes);

      // If one of the chosen colors is close to the product colors
      let matchedByColors = appliedFilters.colors.length === 0;
      const productColors = product.options.map((option) => option.color);

      for (const productColor of productColors) {
        const nearest = findClosestColor(productColor, FILTER_COlORS);

        if (appliedFilters.colors.includes(nearest)) {
          matchedByColors = true;
          break;
        }
      }

      return inPriceRange && matchedByStyles && !missingAppliedSizes.length && matchedByColors;
    });

    setProducts(filteredProducts);
  }, [fetchedProducts, setProducts, appliedFilters]);

  /* Filters drawer */

  const [open, setOpen] = useState(false);

  const { lg, sm } = useBreakpoints({ lg: vars.lg, sm: vars.sm });

  const filtersSidebar = <Filters className={!fetchedProducts?.length ? 'disabled' : ''} />;

  const drawerExtra = (
    <div className="title">
      <h2 className="secondary">{t('FILTERS')}</h2>
    </div>
  );

  /* Render */

  if (!genderSlugAllowedValues.includes(gender)) {
    return <NotFoundPage />;
  }

  return (
    <>
      <MetaTags title={`SHOP.CO | ${t('SHOP_PAGE_TITLE')}`} description={t('SHOP_PAGE_DESCRIPTION')} />

      <main className="shop-page">
        <section className="primary-section breadcrumbs-section">
          <Breadcrumbs />
        </section>

        <section className="primary-section main-section">
          <Flex gap="1.25rem">
            {lg.above ? (
              filtersSidebar
            ) : (
              <Drawer
                className="filters-drawer"
                extra={drawerExtra}
                placement={sm.above ? 'left' : 'bottom'}
                open={open}
                onClose={() => setOpen(false)}
              >
                {filtersSidebar}
              </Drawer>
            )}

            <div className="products">
              <Flex className="products-title" justify="space-between" align="center">
                {type ? (
                  <h2>{t(clothingTypes.find((item) => item.slug === type)?.name ?? '')}</h2>
                ) : (
                  <h2>{t(gender.toUpperCase() + '_COLLECTION')}</h2>
                )}

                {lg.below && <Button icon={<FiltersIcon width={16} height={16} />} onClick={() => setOpen(!open)} />}
              </Flex>

              <ProductsList products={products} pending={isPending} />
            </div>
          </Flex>
        </section>
      </main>
    </>
  );
};

export default ShopPage;
