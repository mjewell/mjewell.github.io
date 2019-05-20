/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const Line: React.FunctionComponent<{
  number: number;
  code: JSX.Element;
}> = ({ number, code }) => {
  return (
    <li
      css={css`
        list-style: none;
      `}
    >
      <span
        css={css`
          display: inline-block;
          margin-right: 1rem;
          text-align: right;
          width: 40px;
        `}
      >
        {number}
      </span>
      {code}
    </li>
  );
};

export default Line;
