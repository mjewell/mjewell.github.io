import ConvenienceStore from 'convenience-store';
import { observable, action } from 'mobx';
import { Value as OnValue } from './On';
import { Value as EveryValue } from './Every';

interface Props {}

export interface Value {
  branch: string;
  data: {
    on: OnValue;
    every: EveryValue;
  };
}

export default class RecurrenceStore extends ConvenienceStore<Props> {
  @observable public value: Value = {
    branch: 'on',
    data: {
      on: null,
      every: {
        count: 1,
        period: 'days',
        startDate: null,
        ending: {
          branch: 'never',
          data: {
            never: null,
            on: null,
            after: 1
          }
        }
      }
    }
  };

  @action.bound
  public setValue(value: Value): void {
    this.value = value;
  }
}
