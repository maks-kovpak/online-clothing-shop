import logo from '../../assets/img/logo.svg';
import { MyDropdown } from '../ui/dropdown/MyDropdown';
import './PageHeader.scss';
import type { MenuProps } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <a href="">Men</a>,
  },
  {
    key: '2',
    label: <a href="">Women</a>,
  },
];

const PageHeader = () => {
  return (
    <header>
      <img src={logo} alt="SHOP.CO" />

      <nav className="navbar">
        <ul>
          <li>
            <MyDropdown items={items}>Shop</MyDropdown>
          </li>

          <li>
            <a href="">On Sale</a>
          </li>

          <li>
            <a href="">New Arrivals</a>
          </li>

          <li>
            <a href="">Brands</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default PageHeader;
