/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment, useRef } from 'react';
import useAvailableHeight from './utils/useAvailableHeight';
import { SpecialCharacters, ClassDefinition, Prop } from './Code';
import LineOfCode from './LineOfCode';

function useNumberOfLines(containerElement: any) {
  const availableHeight = useAvailableHeight(containerElement);

  return Math.floor(availableHeight / 27);
}

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

function createCodeArray(numberOfLines: number) {
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

  return code;
}

const CodeView: React.FunctionComponent<{}> = () => {
  const containerElement = useRef(null) as any;
  const numberOfLines = useNumberOfLines(containerElement);
  const code = createCodeArray(numberOfLines);

  return (
    <div ref={containerElement}>
      {containerElement.current
        ? code.map((line, index) => (
            <LineOfCode key={index} number={index + 1} code={line} />
          ))
        : null}
    </div>
  );
};

export default CodeView;
