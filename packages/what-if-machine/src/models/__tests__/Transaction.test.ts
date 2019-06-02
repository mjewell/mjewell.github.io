import RRule from 'rrule';
import Transaction from '../Transaction';

describe('total', (): void => {
  it('returns the total of the occurrences within the range', (): void => {
    const t = new Transaction(
      1,
      new RRule({
        freq: RRule.DAILY,
        interval: 1,
        dtstart: new Date('2000-01-01')
      })
    );

    expect(t.total(new Date('2000-01-01'), new Date('2000-01-10'))).toBe(10);
  });

  it('ignores occurrences outside of the range', (): void => {
    const t = new Transaction(
      1,
      new RRule({
        freq: RRule.DAILY,
        interval: 1,
        dtstart: new Date('2000-01-01')
      })
    );

    expect(t.total(new Date('1999-01-01'), new Date('1999-01-10'))).toBe(0);
  });
});

describe('dailyAmounts', (): void => {
  it('has 0 for days where it did not occur, and the amount for days where it did', (): void => {
    const t = new Transaction(
      1,
      new RRule({
        freq: RRule.WEEKLY,
        interval: 1,
        dtstart: new Date('2000-01-01')
      })
    );

    expect(
      t.dailyAmounts(new Date('2000-01-01'), new Date('2000-01-10'))
    ).toEqual([1, 0, 0, 0, 0, 0, 0, 1, 0, 0]);
  });
});
