/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FaCalendar } from 'react-icons/fa';

const featuredBlogs = [
  {
    title: 'Rethinking React State',
    date: new Date('2019-01-28'),
    link:
      'https://medium.com/@mjewell/rethinking-containers-and-presenters-82aa1a8a5a72'
  },
  {
    title: 'Functional Composition of React Components',
    date: new Date('2017-03-27'),
    link:
      'https://medium.com/@mjewell/functional-composition-of-react-components-527f6930a42'
  }
];

const Blog: React.FunctionComponent<{ blog: any }> = ({ blog }) => {
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
      <h3
        css={css`
          margin-bottom: 0rem;
        `}
      >
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
      <p
        css={css`
          margin-top: 0.5rem;
        `}
      >
        <FaCalendar
          css={css`
            margin-right: 0.5rem;
          `}
        />
        {blog.date.toLocaleDateString()}
      </p>
    </div>
  );
};

export default ({ path }: { path: string }) => (
  <div
    css={css`
      padding: 1rem;
    `}
  >
    <h1>Blog</h1>
    <h2>Featured Posts</h2>
    {featuredBlogs.map(blog => (
      <Blog key={blog.link} blog={blog} />
    ))}
    <a
      href="https://medium.com/@mjewell"
      css={css`
        color: #eee;
      `}
    >
      And more...
    </a>
  </div>
);
