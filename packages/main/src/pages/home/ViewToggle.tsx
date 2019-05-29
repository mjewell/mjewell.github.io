/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { navigate } from '@reach/router';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

const ViewToggle: React.FunctionComponent<{
  view: 'code' | 'preview';
  onChange: (view: 'code' | 'preview') => void;
}> = ({ view, onChange }) => {
  return (
    <div
      css={css`
        align-items: center;
        display: flex;
        height: 50px;
        justify-content: center;
      `}
    >
      <Toggle
        checked={view === 'preview'}
        onChange={(e: { target: { checked: boolean } }) => {
          const newView = e.target.checked ? 'preview' : 'code';
          navigate(newView === 'code' ? '.' : `.?view=${newView}`);
          onChange(newView);
        }}
        icons={false}
      />
    </div>
  );
};

export default ViewToggle;
