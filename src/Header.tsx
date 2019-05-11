/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { SidebarContext } from './Sidebar';
import { FaBars } from 'react-icons/fa';

export default () => (
  <SidebarContext.Consumer>
    {({ isDocked, toggleOpen }) =>
      isDocked ? null : (
        <header
          css={css`
            background-color: #060606;
          `}
        >
          <button
            css={css`
              background-color: #060606;
              border: none;
              color: #eee;
              cursor: pointer;
              font-size: 2rem;
              padding: 1rem;
            `}
            onClick={() => toggleOpen()}
          >
            <FaBars />
          </button>
        </header>
      )
    }
  </SidebarContext.Consumer>
);
