import { toConverter } from '$chocolate-frontend/utils/toConverter';

export interface IProjectDb {
  id: number;
  ratingSum: number;
  reviewCount: number;
  /** Owner */
  userId: string;
  name: string;
  logo: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IProjectDbApi {
  id: number;
  ratingSum: number;
  reviewCount: number;
  /** Owner */
  userId: string;
  name: string;
  logo: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

function intoProject(api: IProjectDbApi): IProjectDb {
  return {
    ...api,
    createdAt: new Date(api.createdAt),
    updatedAt: new Date(api.updatedAt),
  };
}

export default toConverter(intoProject, 'id');
