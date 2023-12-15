import PageHeader from './components/PageHeader';
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
