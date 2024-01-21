import { Outlet } from 'react-router-dom';
import PageHeader from './components/layout/PageHeader';
import Loading from './components/layout/Loading';

const App = () => {
  return (
    <Loading>
      <PageHeader />
      <Outlet />
    </Loading>
  );
};

export default App;
