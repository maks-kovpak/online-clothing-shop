import { Layout } from 'antd';
import PageHeader from './components/page-header/PageHeader.tsx';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <Layout>
      <PageHeader />

      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default App;
