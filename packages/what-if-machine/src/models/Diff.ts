import { computed } from 'mobx';
import currency from 'currency.js';
import Environment from './Environment';

interface Params {
  beforeEnvironment: Environment;
  afterEnvironment: Environment;
  startDate: Date;
  endDate: Date;
}

export default class Diff {
  public beforeEnvironment: Environment;

  public afterEnvironment: Environment;

  public startDate: Date;

  public endDate: Date;

  public constructor({
    beforeEnvironment,
    afterEnvironment,
    startDate,
    endDate
  }: Params) {
    this.beforeEnvironment = beforeEnvironment;
    this.afterEnvironment = afterEnvironment;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  @computed
  public get beforeNetWorth(): currency {
    return Object.values(this.beforeEnvironment.accounts)
      .filter((account): boolean => !account.isExternal)
      .reduce(
        (sum, account): currency => sum.add(account.balanceOn(this.endDate)),
        currency(0)
      );
  }

  @computed
  public get afterNetWorth(): currency {
    return Object.values(this.afterEnvironment.accounts)
      .filter((account): boolean => !account.isExternal)
      .reduce(
        (sum, account): currency => sum.add(account.balanceOn(this.endDate)),
        currency(0)
      );
  }

  @computed
  public get netWorthDifference(): currency {
    return this.afterNetWorth.subtract(this.beforeNetWorth);
  }
}
