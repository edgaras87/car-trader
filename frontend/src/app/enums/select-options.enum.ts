export enum Months {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export function numKeys(enumObj:any) {
  return Object.values(enumObj).filter(value => typeof value === 'number');
}



