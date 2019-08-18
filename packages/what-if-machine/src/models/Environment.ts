import uniqid from 'uniqid';
import currency from 'currency.js';
import {
  balanceOn,
  createAccount as createAccountBase,
  Params as AccountParams
} from './Account';
import {
  createTransaction as createTransactionBase,
  Params as TransactionParams
} from './Transaction';
import { Omit } from '../utils/Omit';
import { Account, Environment, Transaction } from './Types';
import registry from './registry';

export interface Params {
  id?: string;
  accountIds?: { [key: string]: true };
  transactionIds?: { [key: string]: true };
}

export function createEnvironment({
  id = uniqid(),
  accountIds = {},
  transactionIds = {}
}: Params = {}): Environment {
  const environment = {
    id,
    accountIds,
    transactionIds
  };
  registry.registerEnvironment(environment);
  return environment;
}

export function createAccount(
  environment: Environment,
  accountParams: Omit<AccountParams, 'environmentId'>
): Account {
  const account = createAccountBase({
    ...accountParams,
    environmentId: environment.id
  });
  environment.accountIds[account.id] = true;
  return account;
}

export function addAccount(environment: Environment, account: Account): void {
  environment.accountIds[account.id] = true;
}

export function removeAccount(
  environment: Environment,
  accountOrId: Account | Account['id']
): void {
  const accountId =
    typeof accountOrId === 'string' ? accountOrId : accountOrId.id;

  delete environment.accountIds[accountId];
}

export function getAccounts(environment: Environment): Account[] {
  return Object.keys(environment.accountIds).map(
    (accountId): Account => registry.getAccount(environment.id, accountId)
  );
}

export function createTransaction(
  environment: Environment,
  params: Omit<TransactionParams, 'environmentId'>
): Transaction {
  const transaction = createTransactionBase({
    ...params,
    environmentId: environment.id
  });
  environment.transactionIds[transaction.id] = true;
  return transaction;
}

export function addTransaction(
  environment: Environment,
  transaction: Transaction
): void {
  environment.transactionIds[transaction.id] = true;
}

export function removeTransaction(
  environment: Environment,
  transactionOrId: Transaction | Transaction['id']
): void {
  const transactionId =
    typeof transactionOrId === 'string' ? transactionOrId : transactionOrId.id;

  delete environment.transactionIds[transactionId];
}

export function getTransactions(environment: Environment): Transaction[] {
  return Object.keys(environment.transactionIds).map(
    (transactionId): Transaction =>
      registry.getTransaction(environment.id, transactionId)
  );
}

export function clone(environment: Environment): Environment {
  const newEnvironment: Environment = createEnvironment({
    ...environment,
    id: uniqid()
  });

  getAccounts(newEnvironment).forEach(
    (account): void => {
      createAccount(newEnvironment, { ...account });
    }
  );

  getTransactions(newEnvironment).forEach(
    (transaction): void => {
      createTransaction(newEnvironment, { ...transaction });
    }
  );

  return newEnvironment;
}

export function netWorthAt(environment: Environment, date: Date): currency {
  return getAccounts(environment)
    .filter((account): boolean => !account.isExternal)
    .reduce(
      (sum, account): currency => sum.add(balanceOn(account, date)),
      currency(0)
    );
}
