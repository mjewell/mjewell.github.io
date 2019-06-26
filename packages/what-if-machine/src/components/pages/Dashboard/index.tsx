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

const savingAccount = environment.createAccount({
  name: 'Saving',
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

Object.values(afterEnvironment.transactions)[0].setAmount(3500);
const afterSavings = Object.values(afterEnvironment.accounts).find(
  (account): boolean => account.name === 'Saving'
);

if (!afterSavings) {
  throw new Error('damn it');
}

Object.values(afterEnvironment.transactions)[0].setToAccountId(afterSavings.id);

const diff = new Diff({
  beforeEnvironment: environment,
  afterEnvironment,
  startDate: new Date(),
  endDate: new Date('2020-01-01')
});

console.log(checkingAccount.balanceOn(new Date('2019-08-01')).format());
console.log(externalAccount.balanceOn(new Date('2019-08-01')).format());
console.log(diff.beforeNetWorth.format());
console.log(diff.afterNetWorth.format());
console.log(diff.netWorthDifference.format());

export default (): JSX.Element => <div>hello</div>;
