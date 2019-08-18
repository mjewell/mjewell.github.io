import { Account, Environment, Transaction } from './Types';

class Registry {
  private environments: { [key: string]: Environment } = {};

  private accounts: { [key: string]: Account } = {};

  private transactions: { [key: string]: Transaction } = {};

  public registerEnvironment(environment: Environment): void {
    this.environments[environment.id] = environment;
  }

  public getEnvironment(environmentId: Environment['id']): Environment {
    return this.environments[environmentId];
  }

  public registerAccount(account: Account): void {
    this.accounts[`${account.environmentId}/${account.id}`] = account;
  }

  public getAccount(
    environmentId: Environment['id'],
    accountId: Account['id']
  ): Account {
    return this.accounts[`${environmentId}/${accountId}`];
  }

  public registerTransaction(transaction: Transaction): void {
    this.transactions[
      `${transaction.environmentId}/${transaction.id}`
    ] = transaction;
  }

  public getTransaction(
    environmentId: Environment['id'],
    transactionId: Transaction['id']
  ): Transaction {
    return this.transactions[`${environmentId}/${transactionId}`];
  }
}

export default new Registry();
