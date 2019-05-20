import { FunctionComponent } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export const SpecialCharacters: FunctionComponent = ({ children }) => {
  return (
    <span
      css={css`
        color: #abb2bf;
      `}
    >
      {children}
    </span>
  );
};

export const ClassDefinition: FunctionComponent = ({ children }) => {
  return (
    <span
      css={css`
        color: #e5c07b;
      `}
    >
      {children}
    </span>
  );
};

const PropValue: FunctionComponent = ({ children }) => {
  return (
    <span
      css={css`
        color: #98c379;
      `}
    >
      {children}
    </span>
  );
};

const PropName: FunctionComponent = ({ children }) => {
  return (
    <span
      css={css`
        color: #d19a66;
      `}
    >
      {children}
    </span>
  );
};

export const Prop: FunctionComponent<{
  propName: string;
  propValue: string;
}> = ({ propName, propValue }) => {
  return (
    <span
      css={css`
        margin-left: 1.5rem;
      `}
    >
      <PropName>"{propName}"</PropName>: <PropValue>"{propValue}"</PropValue>
    </span>
  );
};
