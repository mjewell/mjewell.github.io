import RRule from 'rrule';
import { observable, action } from 'mobx';
import currency from 'currency.js';
import uniqid from 'uniqid';
import eachDay from '../utils/eachDay';

export default class Transaction {
  public id: string = uniqid();

  @observable public amount: currency;

  @observable public schedule: RRule;

  @observable public fromAccountId: string;

  @observable public toAccountId: string;

  public constructor(
    amount: number | currency,
    schedule: RRule,
    fromAccountId: string,
    toAccountId: string
  ) {
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

  @action.bound
  public setToAccountId(toAccountId: string): void {
    this.toAccountId = toAccountId;
  }
}
