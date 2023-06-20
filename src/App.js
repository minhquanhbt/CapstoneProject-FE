import React  from 'react';
import Routers from './route/route';
import { withCookies } from 'react-cookie';
import Layout from './layouts/layout';
import 'antd/dist/reset.css';

function App() {
  return (
    <Layout>
    <Layout.Main>   
            <Routers/>
      </Layout.Main>
    </Layout>
  );
}

export default withCookies(App);