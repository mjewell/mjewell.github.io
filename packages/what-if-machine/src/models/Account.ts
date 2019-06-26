import { observable, computed } from 'mobx';
import currency from 'currency.js';
import uniqid from 'uniqid';
import { startOfDay } from 'date-fns';
import Transaction from './Transaction';
import Environment from './Environment';
import { Omit } from '../utils/Omit';

export interface Params {
  environment: Environment;
  isExternal?: boolean;
  name: string;
  initialBalance?: number | currency;
  initialBalanceDate?: Date | null;
  interestRate?: number | currency;
}

export default class Account {
  public id: string = uniqid();

  public environment: Environment;

  @observable public isExternal: boolean;

  @observable public name: string;

  @observable public initialBalance: currency;

  @observable public initialBalanceDate: Date | null;

  @observable public interestRate: currency;

  public constructor({
    environment,
    isExternal = false,
    name,
    initialBalance = 0,
    initialBalanceDate = null,
    interestRate = 0
  }: Params) {
    this.environment = environment;
    this.isExternal = isExternal;
    this.name = name;
    this.initialBalance = currency(initialBalance);
    this.initialBalanceDate = initialBalanceDate
      ? startOfDay(initialBalanceDate)
      : null;
    this.interestRate = currency(interestRate);
  }

  @computed
  public get incomingTransactions(): Transaction[] {
    return Object.values(this.environment.transactions).filter(
      (transaction): boolean => transaction.toAccountId === this.id
    );
  }

  @computed
  public get outgoingTransactions(): Transaction[] {
    return Object.values(this.environment.transactions).filter(
      (transaction): boolean => transaction.fromAccountId === this.id
    );
  }

  public balanceOn(date: Date): currency {
    const startDate = this.initialBalanceDate || new Date('2000-01-01');

    if (date < startDate) {
      throw new Error(
        'Cannot calculate balance from before initial balance date'
      );
    }

    const balanceFromIncomingTransactions = this.incomingTransactions.reduce(
      (sum, transaction): currency =>
        sum.add(transaction.total(startDate, date)),
      currency(0)
    );

    const balanceFromOutgoingTransactions = this.outgoingTransactions.reduce(
      (sum, transaction): currency =>
        sum.add(transaction.total(startDate, date)),
      currency(0)
    );

    return this.initialBalance
      .add(balanceFromIncomingTransactions)
      .subtract(balanceFromOutgoingTransactions);
  }

  public serialize(): Omit<Params, 'environment'> {
    return {
      isExternal: this.isExternal,
      name: this.name,
      initialBalance: this.initialBalance,
      initialBalanceDate: this.initialBalanceDate,
      interestRate: this.interestRate
    };
  }
}
