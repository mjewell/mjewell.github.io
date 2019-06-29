import { computed } from 'mobx';
import currency from 'currency.js';
import Account from './Account';

interface Params {
  beforeAccount: Account;
  afterAccount: Account;
  startDate: Date;
  endDate: Date;
}

export default class AccountDiff {
  public beforeAccount: Account;

  public afterAccount: Account;

  public startDate: Date;

  public endDate: Date;

  public constructor({
    beforeAccount,
    afterAccount,
    startDate,
    endDate
  }: Params) {
    this.beforeAccount = beforeAccount;
    this.afterAccount = afterAccount;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  @computed
  public get balanceDifference(): currency {
    return this.afterAccount
      .balanceOn(this.endDate)
      .subtract(this.beforeAccount.balanceOn(this.endDate));
  }
}
