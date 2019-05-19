/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useRef } from 'react';
import useAvailableHeight from './utils/useAvailableHeight';

const AvailableHeight: React.FunctionComponent<{}> = ({ children }) => {
  const containerElement = useRef(null) as any;
  const availableHeight = useAvailableHeight(containerElement);

  return (
    <div
      css={css`
        height: ${availableHeight}px;
      `}
      ref={containerElement}
    >
      {availableHeight > 0 ? children : null}
    </div>
  );
};

export default AvailableHeight;
