import { toConverter } from '$chocolate-frontend/utils/toConverter';
import { AccountType } from '@choc-js/schema';

export interface IUserDb {
  id: string;
  accountType: AccountType;
  points: number;
  // project: IProjectDb | null;
  // reviews: IReviewDb[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDbApi {
  id: string;
  accountType: AccountType;
  points: number;
  // project: IProjectDb | null;
  // reviews: IReviewDb[] | null;
  createdAt: string;
  updatedAt: string;
}

function intoUser(api: IUserDbApi): IUserDb {
  return {
    ...api,
    createdAt: new Date(api.createdAt),
    updatedAt: new Date(api.updatedAt),
  };
}
export default toConverter(intoUser, 'id');
