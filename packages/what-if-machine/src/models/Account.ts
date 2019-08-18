import currency from 'currency.js';
import uniqid from 'uniqid';
import { startOfDay } from 'date-fns';
import { total } from './Transaction';
import registry from './registry';
import { Account, Environment, Transaction } from './Types';
import { getTransactions } from './Environment';

export interface Params {
  id?: string;
  environmentId: Environment['id'];
  isExternal?: boolean;
  name: string;
  initialBalance?: number;
  initialBalanceDate?: Date | null;
  interestRate?: number;
}

export function createAccount({
  id = uniqid(),
  environmentId,
  isExternal = false,
  name,
  initialBalance = 0,
  initialBalanceDate = null,
  interestRate = 0
}: Params): Account {
  const account = {
    id,
    environmentId,
    isExternal,
    name,
    initialBalance,
    initialBalanceDate: initialBalanceDate
      ? startOfDay(initialBalanceDate)
      : null,
    interestRate
  };
  registry.registerAccount(account);
  return account;
}

function getEnvironment(account: Account): Environment {
  return registry.getEnvironment(account.environmentId);
}

export function incomingTransactions(account: Account): Transaction[] {
  return getTransactions(getEnvironment(account)).filter(
    (transaction): boolean => transaction.toAccountId === account.id
  );
}

export function outgoingTransactions(account: Account): Transaction[] {
  return getTransactions(getEnvironment(account)).filter(
    (transaction): boolean => transaction.fromAccountId === account.id
  );
}

export function balanceOn(account: Account, date: Date): currency {
  const startDate = account.initialBalanceDate || new Date('2000-01-01');

  if (date < startDate) {
    throw new Error(
      'Cannot calculate balance from before initial balance date'
    );
  }

  const balanceFromIncomingTransactions = incomingTransactions(account).reduce(
    (sum, transaction): currency =>
      sum.add(total(transaction, startDate, date)),
    currency(0)
  );

  const balanceFromOutgoingTransactions = outgoingTransactions(account).reduce(
    (sum, transaction): currency =>
      sum.add(total(transaction, startDate, date)),
    currency(0)
  );

  return currency(account.initialBalance)
    .add(balanceFromIncomingTransactions)
    .subtract(balanceFromOutgoingTransactions);
}
