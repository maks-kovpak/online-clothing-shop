import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '@/lib/constants';
import { Flex } from 'antd';

import Navbar from '../Navbar';
import { Input, Select } from '@/ui';

import logo from '@/assets/img/logo.svg';
import SearchIcon from '@/assets/icons/search.svg?react';
import CartIcon from '@/assets/icons/cart.svg?react';
import UserAccountIcon from '@/assets/icons/user-account.svg?react';

import './index.scss';

const PageHeader = () => {
  const { t, i18n } = useTranslation();

  return (
    <header>
      <img src={logo} alt="SHOP.CO" />
      <Navbar />
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
