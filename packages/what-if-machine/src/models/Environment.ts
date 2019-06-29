import { observable, action } from 'mobx';
import currency from 'currency.js';
import Account, { Params as AccountParams } from './Account';
import Transaction, { Params as TransactionParams } from './Transaction';
import { Omit } from '../utils/Omit';

export default class Environment {
  @observable public accounts: { [key: string]: Account } = {};

  @observable public transactions: { [key: string]: Transaction } = {};

  @action.bound
  public createAccount(params: Omit<AccountParams, 'environment'>): Account {
    const account = new Account({ ...params, environment: this });
    this.accounts[account.id] = account;
    return account;
  }

  @action.bound
  public addAccount(account: Account): void {
    this.accounts[account.id] = account;
  }

  @action.bound
  public removeAccount(accountOrId: Account | string): void {
    const accountId =
      typeof accountOrId === 'string' ? accountOrId : accountOrId.id;

    delete this.accounts[accountId];
  }

  @action.bound
  public createTransaction(
    params: Omit<TransactionParams, 'environment'>
  ): Transaction {
    const transaction = new Transaction({ ...params, environment: this });
    this.transactions[transaction.id] = transaction;
    return transaction;
  }

  @action.bound
  public addTransaction(transaction: Transaction): void {
    this.transactions[transaction.id] = transaction;
  }

  @action.bound
  public removeTransaction(transactionOrId: Transaction | string): void {
    const transactionId =
      typeof transactionOrId === 'string'
        ? transactionOrId
        : transactionOrId.id;

    delete this.transactions[transactionId];
  }

  public netWorthAt(date: Date): currency {
    return Object.values(this.accounts)
      .filter((account): boolean => !account.isExternal)
      .reduce(
        (sum, account): currency => sum.add(account.balanceOn(date)),
        currency(0)
      );
  }

  public clone(): Environment {
    const environment = new Environment();

    Object.values(this.accounts).forEach(
      (account): void => {
        environment.createAccount(account.serialize());
      }
    );

    Object.values(this.transactions).forEach(
      (transaction): void => {
        environment.createTransaction(transaction.serialize());
      }
    );

    return environment;
  }
}
