import React from 'react';

interface Value<Data> {
  branch: string;
  data: Data;
}

interface Props<Data> {
  branches: {
    name: string;
    Component: React.ComponentType<{
      value: any;
      onChange: (value: any) => void;
    }>;
  }[];
  value: Value<Data>;
  onChange: (value: Value<Data>) => void;
}

export default function Branch<
  Data extends { [key: string]: Data[keyof Data] }
>({ branches, onChange, value }: Props<Data>): JSX.Element {
  const currentBranchName = value.branch;
  const currentBranch = branches.find(
    (branch): boolean => branch.name === currentBranchName
  );
  const BranchComponent = currentBranch
    ? currentBranch.Component
    : (): null => null;

  return (
    <div>
      <select
        value={currentBranchName}
        onChange={(e): void =>
          onChange({
            ...value,
            branch: e.target.value
          })
        }
      >
        {branches.map(
          (branch): JSX.Element => (
            <option key={branch.name} value={branch.name}>
              {branch.name}
            </option>
          )
        )}
      </select>
      <BranchComponent
        value={value.data[currentBranchName]}
        onChange={(v: Data[keyof Data]): void =>
          onChange({
            ...value,
            data: {
              ...value.data,
              [currentBranchName]: v
            }
          })
        }
      />
    </div>
  );
}
