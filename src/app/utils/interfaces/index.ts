export * from './ICategory';
export * from './IUser';
export * from './IConfig';
export interface ISelectedCombination extends Array<number | null> {
    0: number; // First number
    1: number | null; // Second number
  }