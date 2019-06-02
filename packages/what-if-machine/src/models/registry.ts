import { observable, action } from 'mobx';
import Account from './Account';
import Transaction from './Transaction';

class Registry {
  @observable public accounts: { [key: string]: Account } = {};

  @observable public transactions: { [key: string]: Transaction } = {};

  @action.bound
  public addAccount(account: Account): void {
    this.accounts[account.id] = account;
  }

  @action.bound
  public addTransaction(transaction: Transaction): void {
    this.transactions[transaction.id] = transaction;
  }
}

export default new Registry();
