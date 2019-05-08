/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link } from '@reach/router';

export default function ResumePage({ path }: { path: string }) {
  return (
    <div
      css={css`
        background-color: #111;
        color: #eee;
        display: grid;
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
        grid-template-columns: 50% 50%;
        grid-template-rows: 50% 50%;
        grid-template-areas:
          'top-left top-right'
          'bottom-left bottom-right';
        height: 100vh;
        overflow: hidden;
        width: 100vw;
      `}
    >
      <div
        css={css`
          background-color: #191919;
          display: grid;
          grid-area: top-left;
        `}
      >
        A
      </div>
      <div
        css={css`
          display: grid;
          grid-area: top-right;
        `}
      >
        B
      </div>
      <div
        css={css`
          display: grid;
          grid-area: bottom-left;
        `}
      >
        C
      </div>
      <div
        css={css`
          background-color: #191919;
          display: grid;
          grid-area: bottom-right;
        `}
      >
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
