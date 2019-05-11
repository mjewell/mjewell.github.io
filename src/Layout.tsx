import React from 'react';
import { Router } from '@reach/router';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <Sidebar>
      <Header />
      <main>
        <Router>{children}</Router>
      </main>
    </Sidebar>
  );
};

export default Layout;
