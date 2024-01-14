import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';

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
 * The useNavbarConfig function takes an initial configuration and returns a translated and modified
 * configuration for a navbar component in a TypeScript React application.
 *
 * @param initialConfig - An array of objects representing the initial configuration of the navbar.
 * @returns The translated and modified `NavbarConfig` object.
 */
const useNavbarConfig = (initialConfig: InitialNavbarConfig): NavbarConfig => {
  const { t } = useTranslation();

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
