import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import paths from '@/lib/paths';

export type NavbarConfig = Array<{
  label: string;
  link?: string;
  children?: NavbarConfig;
}>;

/**
 * The `useNavbarConfig` hook generates a configuration for a navigation menu.
 * @returns The translated and modified navbar config.
 */
const useNavbarConfig = (): MenuProps['items'] => {
  const { t } = useTranslation();

  const initialConfig: NavbarConfig = useMemo(
    () => [
      {
        label: 'SHOP',
        children: [
          { label: 'SHOP_MEN', link: paths.shopMen },
          { label: 'SHOP_WOMEN', link: paths.shopWomen },
        ],
      },
      { label: 'ON_SALES', link: paths.sales },
      { label: 'NEW_ARRIVALS', link: paths.newArrivals },
    ],
    []
  );

  const modify = useCallback(
    (config: NavbarConfig): MenuProps['items'] => {
      return config.map((item) => ({
        key: uuidv4(),
        label: <NavLink to={item.link ?? paths.main}>{t(item.label)}</NavLink>,
        children: item?.children && modify(item.children),
      }));
    },
    [t]
  );

  return modify(initialConfig);
};

export default useNavbarConfig;
