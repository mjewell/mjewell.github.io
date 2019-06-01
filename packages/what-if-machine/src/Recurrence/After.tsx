import React from 'react';

interface Props {
  onChange: (value: Value) => void;
  value: Value;
}

export type Value = number;

export default function After({ onChange, value }: Props): JSX.Element {
  return (
    <span>
      <input
        type="number"
        min={1}
        value={value}
        onChange={(e): void => onChange(Number(e.target.value))}
      />{' '}
      times
    </span>
  );
}
