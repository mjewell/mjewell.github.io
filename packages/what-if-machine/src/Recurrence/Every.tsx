import React from 'react';
import On, { Value as OnValue } from './On';
import Period, { Value as PeriodValue } from './Period';
import Ending, { Value as EndingValue } from './Ending';

interface Props {
  onChange: (value: Value) => void;
  value: Value;
}

export type NeverValue = null;

export interface Value {
  count: number;
  period: PeriodValue;
  startDate: OnValue;
  ending: EndingValue;
}

export default function Every({ onChange, value }: Props): JSX.Element {
  const { count, period, startDate, ending } = value;
  return (
    <div>
      <div>
        <input
          type="number"
          value={count}
          min={1}
          onChange={(e): void =>
            onChange({
              ...value,
              count: Number(e.target.value)
            })
          }
        />
        <Period
          value={period}
          onChange={(p): void =>
            onChange({
              ...value,
              period: p
            })
          }
        />
      </div>
      <div>
        <span>starting on</span>
        <On
          value={startDate}
          onChange={(date): void =>
            onChange({
              ...value,
              startDate: date
            })
          }
        />
      </div>
      <span>and ending</span>
      <Ending
        value={ending}
        onChange={(e): void =>
          onChange({
            ...value,
            ending: e
          })
        }
      />
    </div>
  );
}
