import React, { useEffect, useState, useCallback } from 'react';
import ReactSidebar from 'react-sidebar';
import NavigationListener from './NavigationListener';
import Nav from './Nav';

const mql = window.matchMedia(`(min-width: 800px)`);

export const SidebarContext = React.createContext<{
  isDocked: boolean;
  toggleOpen: () => void;
}>({ isDocked: false, toggleOpen: () => {} });

const Sidebar: React.FunctionComponent = ({ children }) => {
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

  const onNavChange = useCallback(() => setSidebarOpen(false), [
    setSidebarOpen
  ]);

  return (
    <SidebarContext.Provider
      value={{
        isDocked: sidebarDocked,
        toggleOpen: () => setSidebarOpen(!sidebarOpen)
      }}
    >
      <ReactSidebar
        sidebar={<Nav />}
        open={sidebarOpen}
        docked={sidebarDocked}
        onSetOpen={setSidebarOpen}
        defaultSidebarWidth={250}
      >
        <NavigationListener onChange={onNavChange} />
        {children}
      </ReactSidebar>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
