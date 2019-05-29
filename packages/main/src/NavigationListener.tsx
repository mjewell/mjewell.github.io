import React, { useEffect } from 'react';
import { Location } from '@reach/router';

const HandleNavigation: React.FunctionComponent<{
  pathname: string;
  onChange: () => void;
}> = ({ pathname, onChange }) => {
  useEffect(() => {
    onChange();
  }, [pathname, onChange]);

  return null;
};

const NavigationListener: React.FunctionComponent<{ onChange: () => void }> = ({
  onChange
}) => (
  <Location>
    {({ location }) => (
      <HandleNavigation pathname={location.pathname} onChange={onChange} />
    )}
  </Location>
);

export default NavigationListener;
