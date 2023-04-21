import { toConverter } from '$chocolate-frontend/utils/toConverter';

export interface IProjectDb {
  id: number;
  ratingSum: number;
  reviewCount: number;
  ratingAverage: number;
  /** Owner */
  ownerId: string;
  name: string;
  logo: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface IProjectDbApi {
  id: number;
  ratingSum: number;
  reviewCount: number;
  ratingAverage: number;
  /** Owner */
  ownerId: string;
  name: string;
  logo: string | null;
  description: string | null;
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
