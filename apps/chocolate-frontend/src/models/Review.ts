import { toConverter } from '$chocolate-frontend/utils/toConverter';

export interface IReviewDb {
  id: number;
  rating: number;
  userId: string;
  projectId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IReviewDbApi {
  id: number;
  rating: number;
  userId: string;
  projectId: number;
  createdAt: string;
  updatedAt: string;
}

function intoReview(api: IReviewDbApi): IReviewDb {
  return {
    ...api,
    createdAt: new Date(api.createdAt),
    updatedAt: new Date(api.updatedAt),
  };
}

export default toConverter(intoReview, 'id');
