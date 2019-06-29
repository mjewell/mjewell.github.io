import { computed } from 'mobx';
import currency from 'currency.js';
import Environment from './Environment';
import Account from './Account';
import AccountDiff from './AccountDiff';

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
  public get netWorthDifference(): currency {
    return this.afterEnvironment
      .netWorthAt(this.endDate)
      .subtract(this.beforeEnvironment.netWorthAt(this.endDate));
  }

  @computed
  public get newAccounts(): Account[] {
    const afterAccounts = Object.values(this.afterEnvironment.accounts);
    return afterAccounts.filter(
      (account): boolean => !(account.id in this.beforeEnvironment.accounts)
    );
  }

  @computed
  public get removedAccounts(): Account[] {
    const beforeAccounts = Object.values(this.beforeEnvironment.accounts);
    return beforeAccounts.filter(
      (account): boolean => !(account.id in this.afterEnvironment.accounts)
    );
  }

  @computed
  public get sharedAccountDiffs(): AccountDiff[] {
    const beforeAccounts = Object.values(this.beforeEnvironment.accounts);
    return beforeAccounts
      .filter(
        (account): boolean => account.id in this.afterEnvironment.accounts
      )
      .map(
        (account): AccountDiff =>
          new AccountDiff({
            beforeAccount: this.beforeEnvironment.accounts[account.id],
            afterAccount: this.afterEnvironment.accounts[account.id],
            startDate: this.startDate,
            endDate: this.endDate
          })
      );
  }

  // new/removed transactions
  // transaction changes
}
