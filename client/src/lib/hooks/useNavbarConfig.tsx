import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import paths from '@/lib/paths';
import type { IClothingType } from '@server/models/ClothingTypes';
import { Gender } from '@server/lib/enums';
import ClothingTypesApi from '@/lib/api/clothingTypes';
import join from 'url-join';
import { useQuery } from '@tanstack/react-query';

export type NavbarConfig = Array<{
  label: string;
  link?: string;
  children?: NavbarConfig;
}>;

const getClothingTypesItems = (types: IClothingType[] | undefined, baseUrl: string, gender: Gender) => {
  if (!types) return [];

  return types
    .filter((type) => type.gender === gender || type.gender === Gender.UNISEX)
    .map((item) => ({
      label: item.name,
      link: join(baseUrl, item.slug),
    }));
};

/**
 * The `useNavbarConfig` hook generates a configuration for a navigation menu.
 * @returns The translated and modified navbar config.
 */
const useNavbarConfig = (): MenuProps['items'] => {
  const { t } = useTranslation();

  const { data: clothingTypes } = useQuery({
    queryKey: ['clothingTypes'],
    queryFn: async () => {
      const response = await ClothingTypesApi.getAll();
      return response.data;
    },
  });

  const initialConfig: NavbarConfig = useMemo(
    () => [
      {
        label: 'SHOP',
        children: [
          {
            label: 'SHOP_MEN',
            link: paths.shopMen,
            children: getClothingTypesItems(clothingTypes, paths.shopMen, Gender.MAN),
          },
          {
            label: 'SHOP_WOMEN',
            link: paths.shopWomen,
            children: getClothingTypesItems(clothingTypes, paths.shopWomen, Gender.WOMAN),
          },
        ],
      },
      { label: 'ON_SALES', link: paths.sales },
      { label: 'NEW_ARRIVALS', link: paths.newArrivals },
    ],
    [clothingTypes]
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
