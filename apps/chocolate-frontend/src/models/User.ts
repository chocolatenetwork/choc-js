import { toConverter } from '$chocolate-frontend/utils/toConverter';
import { AccountType } from '@choc-js/schema';
import { IProjectDb, IProjectDbApi } from './Project';

export interface IUserDb {
  accountId: string;
  accountType: AccountType;
  points: number;
  // project: IProjectDb | null;
  // reviews: IReviewDb[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDbApi {
  accountId: string;
  accountType: AccountType;
  points: number;
  // project: IProjectDb | null;
  // reviews: IReviewDb[] | null;
  createdAt: string;
  updatedAt: string;
}

function intoUser(api: IProjectDbApi): IProjectDb {
  return {
    ...api,
    createdAt: new Date(api.createdAt),
    updatedAt: new Date(api.updatedAt),
  };
}
export default toConverter(intoUser);
