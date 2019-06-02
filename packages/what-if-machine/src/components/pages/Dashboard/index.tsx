import React from 'react';
import RRule from 'rrule';
import Registry from '../../../models/Registry';
import Account from '../../../models/Account';
import Transaction from '../../../models/Transaction';

const registry = new Registry();
const externalAccount = new Account({
  name: 'External',
  transactionRegistry: registry
});

const checkingAccount = new Account({
  name: 'Checking',
  initialBalance: 1000,
  initialBalanceDate: new Date(),
  transactionRegistry: registry
});

const savingAccount = new Account({
  name: 'Saving',
  interestRate: 4,
  transactionRegistry: registry
});

const salary = new Transaction({
  amount: 3300,
  schedule: RRule.fromString(
    'DTSTART:20190607T070000Z\nRRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=FR'
  ),
  fromAccountId: externalAccount.id,
  toAccountId: checkingAccount.id
});

registry.addTransaction(salary);

console.log(checkingAccount.balanceOn(new Date('2019-08-01')).format());
console.log(externalAccount.balanceOn(new Date('2019-08-01')).format());

export default (): JSX.Element => <div>hello</div>;
