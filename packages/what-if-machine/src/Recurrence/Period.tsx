import React from 'react';

interface Props {
  onChange: (value: Value) => void;
  value: Value;
}

export type Value = 'days' | 'weeks' | 'months' | 'years';

export default function Period({ onChange, value }: Props): JSX.Element {
  return (
    <select
      value={value}
      onChange={(e): void => onChange(e.target.value as Value)}
    >
      <option value="days">days</option>
      <option value="weeks">weeks</option>
      <option value="months">months</option>
      <option value="years">years</option>
    </select>
  );
}
