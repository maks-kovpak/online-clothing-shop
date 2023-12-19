import { InitialNavbarConfig } from '@/hooks/useNavbarConfig';
import paths from '@/lib/paths';

const config: InitialNavbarConfig = [
  {
    label: 'SHOP',
    items: [
      {
        label: 'SHOP_MEN',
        link: paths.shopMen,
      },
      {
        label: 'SHOP_WOMEN',
        link: paths.shopWomen,
      },
    ],
  },
  {
    label: 'ON_SALES',
    link: paths.sales,
  },
  {
    label: 'NEW_ARRIVALS',
    link: paths.newArrivals,
  },
  {
    label: 'BRANDS',
    link: paths.brands,
  },
];

export default config;
