import React from 'react';
import On, { Value as OnValue } from './On';
import After, { Value as AfterValue } from './After';
import Branch from '../Branch';

interface Props {
  onChange: (value: Value) => void;
  value: Value;
}

export type NeverValue = null;

export interface Value {
  branch: string;
  data: {
    never: NeverValue;
    on: OnValue;
    after: AfterValue;
  };
}

export default function Ending({ onChange, value }: Props): JSX.Element {
  return (
    <Branch
      branches={[
        {
          name: 'never',
          Component: (): null => null
        },
        {
          name: 'on',
          Component: On
        },
        {
          name: 'after',
          Component: After
        }
      ]}
      value={value}
      onChange={onChange}
    />
  );
}
