import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex } from 'antd';
import { NavLink } from 'react-router-dom';

import Navbar from '../Navbar';
import NavDrawer from '../NavDrawer';
import LanguageSelect from '../../features/LanguageSelect';
import { Input } from '@/ui';
import paths from '@/lib/paths';

import logo from '@/assets/img/logo.svg';
import SearchIcon from '@/assets/icons/search.svg?react';
import CartIcon from '@/assets/icons/cart.svg?react';
import UserAccountIcon from '@/assets/icons/user-account.svg?react';
import HamburgerMenuButton from '@/assets/icons/hamburger-btn.svg?react';

import './index.scss';

const PageHeader = () => {
  const { t } = useTranslation();
  const [openedDrawer, setOpenedDrawer] = useState<boolean>(false);

  return (
    <>
      <header>
        <div className="header-inner">
          <HamburgerMenuButton className="hamburger-menu-btn" onClick={() => setOpenedDrawer(true)} />

          <NavLink to={paths.main}>
            <img src={logo} alt="SHOP.CO" />
          </NavLink>

          <Navbar />
          <Input prefix={<SearchIcon fillOpacity={0.4} />} placeholder={t('SEARCH_PLACEHOLDER')} name="search" />

          <Flex gap={14} align="center" className="header-icons">
            <LanguageSelect />
            <SearchIcon className="search-mobile" />

            <CartIcon />
            <UserAccountIcon />
          </Flex>
        </div>
      </header>

      <NavDrawer opened={openedDrawer} setOpened={setOpenedDrawer} />
    </>
  );
};

export default PageHeader;
