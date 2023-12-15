import { useTranslation } from 'react-i18next';
import { Flex, type MenuProps } from 'antd';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { LANGUAGES } from '@/lib/constants';

import { Dropdown, Input, Select } from '@/ui';

import logo from '@/assets/img/logo.svg';
import SearchIcon from '@/assets/icons/search.svg?react';
import CartIcon from '@/assets/icons/cart.svg?react';
import UserAccountIcon from '@/assets/icons/user-account.svg?react';

import './index.scss';

export type HeaderConfig = Array<{
  label: string;
  link?: string;
  items?: MenuProps['items'];
}>;

const PageHeader = () => {
  const { t, i18n } = useTranslation();

  const config: HeaderConfig = useMemo(
    () => [
      {
        label: t('SHOP'),
        items: [
          {
            key: uuidv4(),
            label: <a href="">{t('SHOP_MEN')}</a>,
          },
          {
            key: uuidv4(),
            label: <a href="">{t('SHOP_WOMEN')}</a>,
          },
        ],
      },
      {
        label: t('ON_SALES'),
        link: '',
      },
      {
        label: t('NEW_ARRIVALS'),
        link: '',
      },
      {
        label: t('BRANDS'),
        link: '',
      },
    ],
    [t]
  );

  return (
    <header>
      <img src={logo} alt="SHOP.CO" />

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

      <Input prefix={<SearchIcon />} placeholder={t('SEARCH_PLACEHOLDER')} />

      <Flex gap={14} align="center">
        <Select
          defaultValue={i18n.language}
          style={{ width: 150 }}
          onChange={(val: string) => i18n.changeLanguage(val)}
          options={LANGUAGES.map((lang) => ({ value: lang.code, label: lang.title }))}
        />

        <CartIcon />
        <UserAccountIcon />
      </Flex>
    </header>
  );
};

export default PageHeader;
