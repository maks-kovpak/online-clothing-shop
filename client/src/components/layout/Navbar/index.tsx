import { v4 as uuidv4 } from 'uuid';
import { Dropdown } from '@/ui';
import { useNavbarConfig } from '@/lib/hooks';

import './index.scss';

const Navbar = () => {
  const config = useNavbarConfig();

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
