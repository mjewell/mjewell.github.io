import RRule from 'rrule';
import currency from 'currency.js';
import uniqid from 'uniqid';
import eachDay from '../utils/eachDay';
import registry from './registry';
import { Account, Environment, Transaction } from './Types';

export interface Params {
  id?: string;
  environmentId: Environment['id'];
  amount: number;
  schedule: string;
  fromAccountId: string;
  toAccountId: string;
}

export function createTransaction({
  id = uniqid(),
  environmentId,
  amount,
  schedule,
  fromAccountId,
  toAccountId
}: Params): Transaction {
  const transaction = {
    id,
    environmentId,
    amount,
    schedule,
    fromAccountId,
    toAccountId
  };
  registry.registerTransaction(transaction);
  return transaction;
}

export function occurrences(
  transaction: Transaction,
  startDate: Date,
  endDate: Date
): Date[] {
  return RRule.fromString(transaction.schedule).between(
    startDate,
    endDate,
    true
  );
}

export function dailyAmounts(
  transaction: Transaction,
  startDate: Date,
  endDate: Date
): currency[] {
  const occurrencesMap = occurrences(transaction, startDate, endDate).reduce<{
    [key: string]: currency;
  }>(
    (obj, date): { [key: string]: currency } => ({
      ...obj,
      [date.getTime()]: transaction.amount
    }),
    {}
  );

  return eachDay(startDate, endDate).map(
    (date): currency => occurrencesMap[date.getTime()] || currency(0)
  );
}

export function total(
  transaction: Transaction,
  startDate: Date,
  endDate: Date
): currency {
  return currency(transaction.amount).multiply(
    occurrences(transaction, startDate, endDate).length
  );
}

export function fromAccount(transaction: Transaction): Account {
  return registry.getAccount(
    transaction.environmentId,
    transaction.fromAccountId
  );
}

export function toAccount(transaction: Transaction): Account {
  return registry.getAccount(
    transaction.environmentId,
    transaction.toAccountId
  );
}
