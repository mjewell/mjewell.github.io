import { observable, action } from 'mobx';
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

  public clone(): Environment {
    const environment = new Environment();

    const accountsCache: { [key: string]: Account } = {};

    Object.values(this.transactions).forEach(
      (transaction): void => {
        const fromAccount =
          accountsCache[transaction.fromAccountId] ||
          environment.createAccount(transaction.fromAccount.serialize());

        accountsCache[transaction.fromAccountId] = fromAccount;

        const toAccount =
          accountsCache[transaction.toAccountId] ||
          environment.createAccount(transaction.toAccount.serialize());

        accountsCache[transaction.toAccountId] = toAccount;

        environment.createTransaction({
          ...transaction.serialize(),
          fromAccountId: fromAccount.id,
          toAccountId: toAccount.id
        });
      }
    );

    Object.values(this.accounts).forEach(
      (account): void => {
        if (accountsCache[account.id]) {
          return;
        }
        environment.createAccount(account.serialize());
      }
    );

    return environment;
  }
}
