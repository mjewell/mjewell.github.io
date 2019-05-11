/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Fragment, useState, useEffect, useRef } from 'react';
import { SpecialCharacters, ClassDefinition, Prop } from './Code';

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

const linesOfCode = [
  <Fragment>
    <SpecialCharacters>{'<'}</SpecialCharacters>
    <ClassDefinition>SoftwareEngineer</ClassDefinition>
  </Fragment>,
  <Prop propName="name" propValue="Michael Jewell" />,
  <Prop propName="location" propValue="Santa Barbara, CA" />,
  <Prop propName="email" propValue="michaeljewell9911@gmail.com" />,
  <Prop propName="phone" propValue="(805) 284-1748" />,
  <SpecialCharacters>{'/>'}</SpecialCharacters>
];

function useWindowHeight() {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return height;
}

const CodeBlock: React.FunctionComponent<{}> = () => {
  const containerElement = useRef(null) as any;
  const [numberOfLines, setNumberOfLines] = useState(0);

  const windowHeight = useWindowHeight();

  useEffect(() => {
    const availableHeight = windowHeight - containerElement.current.offsetTop;

    setNumberOfLines(Math.floor(availableHeight / 18));
  }, [containerElement, windowHeight]);

  const code = [];
  const numberOfBlankLines = Math.floor(
    (numberOfLines - linesOfCode.length) / 2
  );

  for (let i = 0; i < numberOfBlankLines; i++) {
    code.push(<div />);
  }

  for (let i = 0; i < linesOfCode.length; i++) {
    code.push(linesOfCode[i]);
  }

  for (let i = 0; i < numberOfBlankLines; i++) {
    code.push(<div />);
  }

  return (
    <div css={css``} ref={containerElement}>
      {containerElement.current
        ? code.map((line, index) => (
            <Line key={index} number={index + 1} code={line} />
          ))
        : null}
    </div>
  );
};

export default CodeBlock;
