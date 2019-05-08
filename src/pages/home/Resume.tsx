/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link } from '@reach/router';

export default function Resume() {
  return (
    <div
      css={css`
        color: #fff;
        font-size: 4rem;
        margin: auto;
      `}
    >
      <Link to="/resume">Résumé</Link>
    </div>
  );
}
