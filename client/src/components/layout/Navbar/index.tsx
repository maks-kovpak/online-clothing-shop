import { useNavbarConfig } from '@/lib/hooks';
import { Menu } from 'antd';

import './index.scss';

const Navbar = () => {
  const config = useNavbarConfig();

  return (
    <nav className="navbar">
      <Menu mode="horizontal" items={config} />
    </nav>
  );
};

export default Navbar;
