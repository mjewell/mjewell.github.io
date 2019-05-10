/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FaCaretDown, FaFolderOpen, FaRegFileCode } from 'react-icons/fa';
import { Link } from '@reach/router';

const Row: React.FunctionComponent<{ indent: number }> = ({
  children,
  indent
}) => (
  <div
    css={css`
      padding: 0.5rem 0 0.5rem ${indent}rem;
    `}
  >
    {children}
  </div>
);

const borderSize = '3px';
const navBorderAccent = '#f58b00';
const navSelectedBackgroundColor = '#83e2fc33';
const navHoverBackgroundColor = '#37414050';

const NavLink: React.FunctionComponent<{ to: string; indent: number }> = ({
  children,
  indent,
  ...props
}) => (
  <Link
    {...props}
    css={css`
      border-left: ${borderSize} solid transparent;
      display: block;
      color: #eee;
      text-decoration: none;

      &:hover {
        background-color: ${navHoverBackgroundColor};
        border-left: ${borderSize} solid ${navBorderAccent};
      }
    `}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          backgroundColor: isCurrent ? navSelectedBackgroundColor : null,
          borderLeft: isCurrent ? `3px solid ${navBorderAccent}` : null
        }
      };
    }}
  >
    <Row indent={indent}>{children}</Row>
  </Link>
);

export default () => (
  <nav
    css={css`
      background-color: #060606;
      height: 100%;
      font-size: 1.5rem;
      width: 250px;
    `}
  >
    <header
      css={css`
        margin-bottom: 1rem;
        padding: 1rem;
      `}
    >
      EXPLORER
    </header>
    <div>
      <Row indent={1}>
        <FaCaretDown /> Files
      </Row>
      <Row indent={1.25}>
        <FaFolderOpen
          css={css`
            vertical-align: top;
          `}
        />{' '}
        src
      </Row>
      <NavLink indent={3} to="/">
        <FaRegFileCode /> Home.js
      </NavLink>
      <NavLink indent={3} to="/code">
        <FaRegFileCode /> Code.js
      </NavLink>
      <NavLink indent={3} to="/blog">
        <FaRegFileCode /> Blog.js
      </NavLink>
      <NavLink indent={3} to="/resume">
        <FaRegFileCode /> Resume.js
      </NavLink>
    </div>
  </nav>
);
