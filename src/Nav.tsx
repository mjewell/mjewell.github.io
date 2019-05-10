/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export default () => (
  <nav
    css={css`
      background-color: #060606;
      height: 100%;
      padding: 0.5rem;
      width: 250px;
    `}
  >
    <header>EXPLORER</header>
    <div>Files</div>
  </nav>
);
