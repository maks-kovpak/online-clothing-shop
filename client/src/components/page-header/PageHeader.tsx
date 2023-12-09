import { Header } from 'antd/es/layout/layout';
import logo from '../../assets/img/logo.svg';
import './PageHeader.scss';

const PageHeader = () => {
  return (
    <Header>
      <img src={logo} alt="Shop.co" />
    </Header>
  );
};

export default PageHeader;
