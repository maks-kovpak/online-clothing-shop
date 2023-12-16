import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dropdown } from '@/ui';
import { useTranslation } from 'react-i18next';
import type { MenuProps } from 'antd';

import './index.scss';

export type HeaderConfig = Array<{
  label: string;
  link?: string;
  items?: MenuProps['items'];
}>;

const Navbar = () => {
  const { t } = useTranslation();

  const config: HeaderConfig = useMemo(
    () => [
      {
        label: t('SHOP'),
        items: [
          { key: uuidv4(), label: <a href="">{t('SHOP_MEN')}</a> },
          { key: uuidv4(), label: <a href="">{t('SHOP_WOMEN')}</a> },
        ],
      },
      { label: t('ON_SALES'), link: '' },
      { label: t('NEW_ARRIVALS'), link: '' },
      { label: t('BRANDS'), link: '' },
    ],
    [t]
  );

  return (
    <nav className="navbar">
      <ul>
        {config.map((item) =>
          item.items === undefined ? (
            <li key={uuidv4()}>
              <a href={item.link ?? '/'}>{item.label}</a>
            </li>
          ) : (
            <li key={uuidv4()}>
              <Dropdown items={item.items}>{item.label}</Dropdown>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
