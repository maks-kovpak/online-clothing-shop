import { useTranslation } from 'react-i18next';
import logo from '@/assets/img/logo.svg';
import MyDropdown from '../ui/dropdown/MyDropdown';
import './PageHeader.scss';
import type { MenuProps } from 'antd';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MyInput from '../ui/input/MyInput';
import SearchIcon from '@/assets/icons/search.svg?react';

export type HeaderConfig = Array<{
  label: string;
  link?: string;
  items?: MenuProps['items'];
}>;

const PageHeader = () => {
  const { t } = useTranslation();

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
                <MyDropdown items={item.items}>{item.label}</MyDropdown>
              </li>
            )
          )}
        </ul>
      </nav>

      <MyInput type="search" prefix={<SearchIcon />} />
    </header>
  );
};

export default PageHeader;
