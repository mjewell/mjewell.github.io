import React, { useState } from 'react';
import RRule from 'rrule';
import {
  createAccount,
  createEnvironment,
  createTransaction,
  clone,
  getTransactions,
  getAccounts,
  removeAccount
} from '../../../models/Environment';
// import Diff from '../../../models/Diff';
import { balanceOn } from '../../../models/Account';

const environment = createEnvironment();
const externalAccount = createAccount(environment, {
  isExternal: true,
  name: 'External'
});

const checkingAccount = createAccount(environment, {
  name: 'Checking',
  initialBalance: 1000,
  initialBalanceDate: new Date()
});

const savingsAccount = createAccount(environment, {
  name: 'Savings',
  interestRate: 4
});

const salary = createTransaction(environment, {
  amount: 3300,
  schedule: 'DTSTART:20190625T070000Z\nRRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=FR',
  fromAccountId: externalAccount.id,
  toAccountId: checkingAccount.id
});

const afterEnvironment = clone(environment);

getTransactions(afterEnvironment)[0].amount = 4000;
const afterSavings = getAccounts(afterEnvironment).find(
  (account): boolean => account.name === 'Savings'
);

if (!afterSavings) {
  throw new Error('damn it');
}

getTransactions(afterEnvironment)[0].toAccountId = afterSavings.id;

createAccount(afterEnvironment, {
  name: 'some new account'
});

removeAccount(afterEnvironment, checkingAccount.id);

const diff = new Diff({
  beforeEnvironment: environment,
  afterEnvironment,
  startDate: new Date(),
  endDate: new Date('2020-01-01')
});

function logStuff(): void {
  console.log(diff.netWorthDifference.format());
  console.log(diff.newAccounts.map((a): string => a.name));
  console.log(diff.removedAccounts.map((a): string => a.name));
  console.log(diff.sharedAccountDiffs.map((d): string => d.beforeAccount.name));
  console.log(
    diff.sharedAccountDiffs.map(
      (d): string => balanceOn(d.beforeAccount, d.endDate).format()
    )
  );
  console.log(
    diff.sharedAccountDiffs.map(
      (d): string => balanceOn(d.afterAccount, d.endDate).format()
    )
  );
  console.log(
    diff.sharedAccountDiffs.map((d): string => d.balanceDifference.format())
  );
}

function NewAccount(): JSX.Element {
  const [name, setName] = useState('');

  function setNameFromEvent(event: React.ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  function createAccount(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    afterEnvironment.createAccount({
      name
    });
    setName('');
  }

  return (
    <div>
      <h1>New Account</h1>
      <form>
        <div>
          <label htmlFor="account_name">
            Name
            <input id="account_name" onChange={setNameFromEvent} value={name} />
          </label>
        </div>
        <button type="submit" onClick={createAccount}>
          Create Account
        </button>
      </form>
    </div>
  );
}

function AccountSelect({
  id,
  onChange,
  value
}: {
  id: string;
  onChange: (accountId: string) => void;
  value: string | undefined;
}): JSX.Element {
  function onChangeFromEvent(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    onChange(event.target.value);
  }

  return (
    <select id={id} onChange={onChangeFromEvent} value={value}>
      <option value={undefined}>Pick an account</option>
      {Object.values(afterEnvironment.accounts).map(
        (account): JSX.Element => (
          <option key={account.id} value={account.id}>
            {account.name}
          </option>
        )
      )}
    </select>
  );
}

function NewTransaction(): JSX.Element {
  const [amount, setAmount] = useState('');

  function setAmountFromEvent(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setAmount(event.target.value);
  }

  const [fromAccountId, setFromAccountId] = useState<string | undefined>(
    undefined
  );

  const [toAccountId, setToAccountId] = useState<string | undefined>(undefined);

  function createTransaction(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    if (!fromAccountId || !toAccountId) {
      return;
    }
    afterEnvironment.createTransaction({
      amount: Number(amount) || 0,
      schedule: RRule.fromString(
        'DTSTART:20190625T070000Z\nRRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=FR'
      ),
      fromAccountId,
      toAccountId
    });
    setAmount('');
    setFromAccountId(undefined);
    setToAccountId(undefined);
  }

  return (
    <div>
      <h1>New Transaction</h1>
      <form>
        <div>
          <label htmlFor="transaction_name">
            Name
            <input
              id="transaction_name"
              onChange={setAmountFromEvent}
              value={amount}
            />
          </label>
        </div>
        <div>
          From
          <AccountSelect
            id="transaction_from"
            onChange={setFromAccountId}
            value={fromAccountId}
          />
        </div>
        <div>
          To
          <AccountSelect
            id="transaction_to"
            onChange={setToAccountId}
            value={toAccountId}
          />
        </div>
        <button type="submit" onClick={createTransaction}>
          Create Transaction
        </button>
      </form>
    </div>
  );
}

function RemoveAccount(): JSX.Element {
  return (
    <div>
      <h1>Remove Account</h1>
      <button type="button">Remove Account</button>
    </div>
  );
}

export default (): JSX.Element => {
  return (
    <div>
      <NewAccount />
      <RemoveAccount />
      <NewTransaction />
      <br />
      <br />
      <br />
      <button type="button" onClick={logStuff}>
        log stuff
      </button>
    </div>
  );
};
