/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const featuredBlogs = [
  {
    title: 'mobx-base-store',
    link: 'https://github.com/mjewell/mobx-base-store'
  },
  {
    title: 'mjewell.github.io',
    link: 'https://github.com/mjewell/mjewell.github.io'
  },
  {
    title: 'what-if-machine',
    link: 'https://github.com/mjewell/what-if-machine'
  }
];

const Code: React.FunctionComponent<{ blog: any }> = ({ blog }) => {
  return (
    <div
      css={css`
        background-color: #eee;
        border-radius: 3px;
        color: #111;
        margin-bottom: 2rem;
        max-width: 500px;
        padding: 0.5rem 1rem;
      `}
    >
      <h3>
        <a
          href={blog.link}
          css={css`
            color: #f58b00;
            font-size: 1.5rem;
            text-decoration: none;
          `}
        >
          {blog.title}
        </a>
      </h3>
    </div>
  );
};

export default ({ path }: { path: string }) => (
  <div
    css={css`
      padding: 1rem;
    `}
  >
    <h1>Code</h1>
    <h2>Featured Projects</h2>
    {featuredBlogs.map(blog => (
      <Code key={blog.link} blog={blog} />
    ))}
    <a
      href="https://github.com/mjewell"
      css={css`
        color: #eee;
      `}
    >
      And more...
    </a>
  </div>
);
