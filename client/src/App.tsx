import PageHeader from './components/page-header/PageHeader.tsx';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <PageHeader />
      <Outlet />
    </>
  );
};

export default App;
