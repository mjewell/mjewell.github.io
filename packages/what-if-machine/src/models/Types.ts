export interface Environment {
  id: string;
  accountIds: { [key: string]: true };
  transactionIds: { [key: string]: true };
}

export interface Account {
  id: string;
  environmentId: Environment['id'];
  isExternal: boolean;
  name: string;
  initialBalance: number;
  initialBalanceDate: Date | null;
  interestRate: number;
}

export interface Transaction {
  id: string;
  environmentId: Environment['id'];
  amount: number;
  schedule: string;
  fromAccountId: Account['id'];
  toAccountId: Account['id'];
}
