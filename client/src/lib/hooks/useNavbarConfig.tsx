import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import paths from '@/lib/paths';

export type NavbarConfig = Array<{
  label: string;
  link?: string;
  items?: MenuProps['items'];
}>;

export type InitialNavbarConfig = Array<{
  label: string;
  link?: string;
  items?: Array<{ label: string; link: string }>;
}>;

/**
 * The `useNavbarConfig` hook takes an initial configuration and returns a translated and modified
 * configuration for a navbar component in a TypeScript React application.
 *
 * @returns The translated and modified `NavbarConfig` object.
 */
const useNavbarConfig = (): NavbarConfig => {
  const { t } = useTranslation();

  const initialConfig: InitialNavbarConfig = useMemo(
    () => [
      {
        label: 'SHOP',
        items: [
          { label: 'SHOP_MEN', link: paths.shopMen },
          { label: 'SHOP_WOMEN', link: paths.shopWomen },
        ],
      },
      { label: 'ON_SALES', link: paths.sales },
      { label: 'NEW_ARRIVALS', link: paths.newArrivals },
    ],
    []
  );

  return useMemo(() => {
    return initialConfig.map((element) => ({
      ...element,
      label: t(element.label),
      items: element.items?.map((item) => ({
        key: uuidv4(),
        label: <NavLink to={item.link}>{t(item.label)}</NavLink>,
      })),
    }));
  }, [initialConfig, t]);
};

export default useNavbarConfig;
