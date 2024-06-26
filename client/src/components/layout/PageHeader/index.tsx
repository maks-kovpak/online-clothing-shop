import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Avatar, Skeleton, Badge } from 'antd';
import { NavLink } from 'react-router-dom';

import Navbar from '../Navbar';
import NavDrawer from '../NavDrawer';
import LanguageSelect from '../../features/LanguageSelect';
import { Input } from '@/ui';
import paths from '@/lib/paths';
import { useUnit } from 'effector-react';
import $user, { fetchUserProfileFx } from '@/stores/user.store';
import { $cart } from '@/stores/cart.store';

import logo from '@/assets/img/logo.svg';
import SearchIcon from '@/assets/icons/search.svg?react';
import CartIcon from '@/assets/icons/cart.svg?react';
import UserAccountIcon from '@/assets/icons/user-account.svg?react';
import HamburgerMenuButton from '@/assets/icons/hamburger-btn.svg?react';

import './index.scss';

const PageHeader = () => {
  const { t } = useTranslation();
  const [openedDrawer, setOpenedDrawer] = useState<boolean>(false);
  const [user, pending] = useUnit([$user, fetchUserProfileFx.pending]);
  const cart = useUnit($cart);

  return (
    <>
      <header>
        <div className="header-inner">
          <HamburgerMenuButton className="hamburger-menu-btn" onClick={() => setOpenedDrawer(true)} />

          <NavLink to={paths.main} className="logo">
            <img src={logo} alt="SHOP.CO" />
          </NavLink>

          <Navbar />

          <Input
            className="gray-input"
            prefix={<SearchIcon fillOpacity={0.4} />}
            placeholder={t('SEARCH_PLACEHOLDER')}
            name="search"
          />

          <Flex gap={14} align="center" className="header-icons">
            <LanguageSelect />
            <SearchIcon className="search-mobile" />

            {user && (
              <NavLink to={paths.cart} title={t('SHOPPING_CART')} style={{ display: 'flex' }}>
                <Badge size="small" count={cart?.length} offset={[-1, 3]}>
                  <CartIcon />
                </Badge>
              </NavLink>
            )}

            {pending ? (
              <Skeleton.Avatar shape="circle" active />
            ) : user ? (
              <NavLink to={paths.profile} title={t('PROFILE')} style={{ display: 'flex' }}>
                <Avatar src={user.profileImage}>{user.name[0].toUpperCase()}</Avatar>
              </NavLink>
            ) : (
              <NavLink to={paths.signup} title={t('SIGN_UP')} style={{ display: 'flex' }}>
                <UserAccountIcon />
              </NavLink>
            )}
          </Flex>
        </div>
      </header>

      <NavDrawer opened={openedDrawer} setOpened={setOpenedDrawer} />
    </>
  );
};

export default PageHeader;
