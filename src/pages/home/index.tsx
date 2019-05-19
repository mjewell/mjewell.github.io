/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import Media from 'react-media';
import 'react-toggle/style.css';
import qs from 'qs';
import CodeView from './CodeView';
import PreviewView from './PreviewView';
import ViewToggle from './ViewToggle';

const breakpoint = 1300;

function getViewFromQueryString() {
  const queryStringView = qs.parse(window.location.search.slice(1)).view;

  if (['code', 'preview'].includes(queryStringView)) {
    return queryStringView;
  }

  return 'code';
}

export default function HomePage({ path }: { path: string }) {
  const [view, setView] = useState<'code' | 'preview'>(
    getViewFromQueryString() || 'code'
  );
  const [showBothViews, setShowBothViews] = useState(
    window.innerWidth > breakpoint
  );

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        flex: 1;
        font-size: 1.5rem;
      `}
    >
      <Media
        query={{ maxWidth: breakpoint }}
        onChange={matches => setShowBothViews(!matches)}
      />
      <Media query={{ maxWidth: breakpoint }}>
        {matches =>
          matches ? <ViewToggle view={view} onChange={setView} /> : null
        }
      </Media>
      <div
        css={css`
          display: flex;
          flex: 1;
          flex-direction: row;
        `}
      >
        {showBothViews || view === 'code' ? (
          <div
            css={css`
              flex: 1;
            `}
          >
            <CodeView />
          </div>
        ) : null}
        <Media query={{ maxWidth: breakpoint }}>
          {matches =>
            matches ? null : (
              <div
                css={css`
                  border-left: 1px solid;
                  color: #555;
                `}
              />
            )
          }
        </Media>
        {showBothViews || view === 'preview' ? (
          <div
            css={css`
              flex: 1;
            `}
          >
            <PreviewView />
          </div>
        ) : null}
      </div>
    </div>
  );
}
