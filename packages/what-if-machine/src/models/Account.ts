import { observable, computed } from 'mobx';
import currency from 'currency.js';
import uniqid from 'uniqid';
import Transaction from './Transaction';
import registry from './registry';

export default class Account {
  public id: string = uniqid();

  @observable public initialBalance: currency;

  @observable public initialBalanceDate: Date;

  @observable public interestRate: currency;

  public constructor(
    initialBalance: number | currency,
    initialBalanceDate: Date,
    interestRate: number | currency
  ) {
    this.initialBalance = currency(initialBalance);
    this.initialBalanceDate = initialBalanceDate;
    this.interestRate = currency(interestRate);
  }

  @computed
  public get incomingTransactions(): Transaction[] {
    return Object.values(registry.transactions).filter(
      (transaction): boolean => transaction.toAccountId === this.id
    );
  }

  @computed
  public get outgoingTransactions(): Transaction[] {
    return Object.values(registry.transactions).filter(
      (transaction): boolean => transaction.fromAccountId === this.id
    );
  }

  public balanceAt(date: Date): currency {
    if (date < this.initialBalanceDate) {
      throw new Error(
        'Cannot calculate balance from before initial balance date'
      );
    }

    const balanceFromIncomingTransactions = this.incomingTransactions.reduce(
      (sum, transaction): currency =>
        sum.add(transaction.total(this.initialBalanceDate, date)),
      currency(0)
    );

    const balanceFromOutgoingTransactions = this.outgoingTransactions.reduce(
      (sum, transaction): currency =>
        sum.add(transaction.total(this.initialBalanceDate, date)),
      currency(0)
    );

    return this.initialBalance
      .add(balanceFromIncomingTransactions)
      .subtract(balanceFromOutgoingTransactions);
  }
}
