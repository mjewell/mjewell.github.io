import React from 'react';

interface Props {
  onChange: (value: Value) => void;
  value: Value;
}

export type Value = null | Date;

export default function On({ onChange, value }: Props): JSX.Element {
  return (
    <input
      type="date"
      value={value ? value.toISOString().slice(0, 10) : ''}
      onChange={(e): void =>
        onChange(e.target.value ? new Date(e.target.value) : null)
      }
    />
  );
}
