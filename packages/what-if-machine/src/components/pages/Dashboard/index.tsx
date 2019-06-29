import React from 'react';
import RRule from 'rrule';
import Environment from '../../../models/Environment';
import Diff from '../../../models/Diff';

const environment = new Environment();
const externalAccount = environment.createAccount({
  isExternal: true,
  name: 'External'
});

const checkingAccount = environment.createAccount({
  name: 'Checking',
  initialBalance: 1000,
  initialBalanceDate: new Date()
});

const savingsAccount = environment.createAccount({
  name: 'Savings',
  interestRate: 4
});

const salary = environment.createTransaction({
  amount: 3300,
  schedule: RRule.fromString(
    'DTSTART:20190625T070000Z\nRRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=FR'
  ),
  fromAccountId: externalAccount.id,
  toAccountId: checkingAccount.id
});

const afterEnvironment = environment.clone();

Object.values(afterEnvironment.transactions)[0].setAmount(4000);
const afterSavings = Object.values(afterEnvironment.accounts).find(
  (account): boolean => account.name === 'Savings'
);

if (!afterSavings) {
  throw new Error('damn it');
}

Object.values(afterEnvironment.transactions)[0].setToAccountId(afterSavings.id);

afterEnvironment.createAccount({
  name: 'some new account'
});

afterEnvironment.removeAccount(checkingAccount.id);

const diff = new Diff({
  beforeEnvironment: environment,
  afterEnvironment,
  startDate: new Date(),
  endDate: new Date('2020-01-01')
});

console.log(diff.netWorthDifference.format());
console.log(diff.newAccounts.map((a): string => a.name));
console.log(diff.removedAccounts.map((a): string => a.name));
console.log(diff.sharedAccountDiffs.map((d): string => d.beforeAccount.name));
console.log(
  diff.sharedAccountDiffs.map(
    (d): string => d.beforeAccount.balanceOn(d.endDate).format()
  )
);
console.log(
  diff.sharedAccountDiffs.map(
    (d): string => d.afterAccount.balanceOn(d.endDate).format()
  )
);
console.log(
  diff.sharedAccountDiffs.map((d): string => d.balanceDifference.format())
);

export default (): JSX.Element => <div>hello</div>;
