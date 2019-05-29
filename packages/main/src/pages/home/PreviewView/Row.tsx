/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export default function Row({
  Icon,
  text,
  label
}: {
  Icon: any;
  text: React.ReactNode;
  label: string;
}) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        margin-bottom: 1.5rem;
      `}
    >
      <div
        css={css`
          width: 40px;
          margin-right: 1rem;
        `}
      >
        <Icon
          css={css`
            color: #0f89e2;
            font-size: 2.5rem;
          `}
        />
      </div>
      <div>
        <div>{text}</div>
        <div
          css={css`
            color: #777;
            font-size: 1rem;
          `}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
