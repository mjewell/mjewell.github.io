import RRule from 'rrule';
import { observable, action, computed } from 'mobx';
import currency from 'currency.js';
import uniqid from 'uniqid';
import eachDay from '../utils/eachDay';
import Environment from './Environment';
import Account from './Account';
import { Omit } from '../utils/Omit';

export interface Params {
  environment: Environment;
  amount: number | currency;
  schedule: RRule;
  fromAccountId: string;
  toAccountId: string;
}

export default class Transaction {
  public id: string = uniqid();

  public environment: Environment;

  @observable public amount: currency;

  @observable public schedule: RRule;

  @observable public fromAccountId: string;

  @observable public toAccountId: string;

  public constructor({
    environment,
    amount,
    schedule,
    fromAccountId,
    toAccountId
  }: Params) {
    this.environment = environment;
    this.amount = currency(amount);
    this.schedule = schedule;
    this.fromAccountId = fromAccountId;
    this.toAccountId = toAccountId;
  }

  public occurrences(startDate: Date, endDate: Date): Date[] {
    return this.schedule.between(startDate, endDate, true);
  }

  public dailyAmounts(startDate: Date, endDate: Date): currency[] {
    const occurrencesMap = this.occurrences(startDate, endDate).reduce<{
      [key: string]: currency;
    }>(
      (obj, date): { [key: string]: currency } => ({
        ...obj,
        [date.getTime()]: this.amount
      }),
      {}
    );

    return eachDay(startDate, endDate).map(
      (date): currency => occurrencesMap[date.getTime()] || currency(0)
    );
  }

  public total(startDate: Date, endDate: Date): currency {
    return this.amount.multiply(this.occurrences(startDate, endDate).length);
  }

  @action.bound
  public setAmount(amount: number | currency): void {
    this.amount = currency(amount);
  }

  @action.bound
  public setFromAccountId(fromAccountId: string): void {
    this.fromAccountId = fromAccountId;
  }

  @computed
  public get fromAccount(): Account {
    return this.environment.accounts[this.fromAccountId];
  }

  @action.bound
  public setToAccountId(toAccountId: string): void {
    this.toAccountId = toAccountId;
  }

  @computed
  public get toAccount(): Account {
    return this.environment.accounts[this.toAccountId];
  }

  public serialize(): Omit<Params, 'environment'> {
    return {
      amount: this.amount,
      schedule: this.schedule,
      fromAccountId: this.fromAccountId,
      toAccountId: this.toAccountId
    };
  }
}
