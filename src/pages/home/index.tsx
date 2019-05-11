/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import CodeBlock from './CodeBlock';

export default function HomePage({ path }: { path: string }) {
  return (
    <div css={css``}>
      <CodeBlock />
    </div>
  );
}
