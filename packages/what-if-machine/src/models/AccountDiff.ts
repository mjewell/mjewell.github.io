// import { computed } from 'mobx';
// import currency from 'currency.js';
// import Account, { balanceOn } from './Account';

// interface Params {
//   beforeAccount: Account;
//   afterAccount: Account;
//   startDate: Date;
//   endDate: Date;
// }

// export default class AccountDiff {
//   public beforeAccount: Account;

//   public afterAccount: Account;

//   public startDate: Date;

//   public endDate: Date;

//   public constructor({
//     beforeAccount,
//     afterAccount,
//     startDate,
//     endDate
//   }: Params) {
//     this.beforeAccount = beforeAccount;
//     this.afterAccount = afterAccount;
//     this.startDate = startDate;
//     this.endDate = endDate;
//   }

//   @computed
//   public get balanceDifference(): currency {
//     return balanceOn(this.afterAccount, this.endDate).subtract(
//       balanceOn(this.beforeAccount, this.endDate)
//     );
//   }
// }
