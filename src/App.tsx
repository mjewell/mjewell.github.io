/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Home from './pages/home';
import Code from './pages/code';
import Blog from './pages/blog';
import Resume from './pages/resume';
import Layout from './Layout';

export default function App() {
  return (
    <div
      css={css`
        background-color: #111;
        color: #eee;
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
        min-height: 100vh;
        overflow: hidden;
        width: 100vw;
      `}
    >
      <Layout>
        <Home path="/" />
        <Code path="/code" />
        <Blog path="/blog" />
        <Resume path="/resume" />
      </Layout>
    </div>
  );
}
