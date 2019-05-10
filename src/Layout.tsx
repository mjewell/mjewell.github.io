import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router';
import SideBar from 'react-sidebar';
import Nav from './Nav';

const mql = window.matchMedia(`(min-width: 800px)`);

const Layout: React.FunctionComponent = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarDocked, setSidebarDocked] = useState(mql.matches);

  useEffect(() => {
    function handleMediaQueryChange() {
      setSidebarOpen(false);
      setSidebarDocked(mql.matches);
    }

    mql.addListener(handleMediaQueryChange);
    return () => mql.removeListener(handleMediaQueryChange);
  }, []);

  return (
    <SideBar
      sidebar={<Nav />}
      open={sidebarOpen}
      docked={sidebarDocked}
      onSetOpen={setSidebarOpen}
      defaultSidebarWidth={250}
    >
      <Router>{children}</Router>
    </SideBar>
  );
};

export default Layout;
