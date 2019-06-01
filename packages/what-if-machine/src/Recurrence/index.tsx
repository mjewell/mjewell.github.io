import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Store from './store';
import On from './On';
import Every from './Every';
import Branch from '../Branch';

interface Props {}

@observer
export default class Recurrence extends Component<Props> {
  public constructor(props: Props) {
    super(props);

    this.store = Store.create();
  }

  public store: Store;

  public render(): JSX.Element {
    return (
      <div>
        <Branch
          branches={[
            {
              name: 'on',
              Component: On
            },
            {
              name: 'every',
              Component: Every
            }
          ]}
          value={this.store.value}
          onChange={this.store.setValue}
        />
        <pre>{JSON.stringify(this.store.value, null, 2)}</pre>
      </div>
    );
  }
}
