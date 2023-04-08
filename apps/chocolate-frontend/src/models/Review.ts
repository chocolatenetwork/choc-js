import { toConverter } from '$chocolate-frontend/utils/toConverter';

export interface IReviewDb {
  reviewId: number;
  rating: number;
  userAccountId: string;
  projectProjectId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IReviewDbApi {
  reviewId: number;
  rating: number;
  userAccountId: string;
  projectProjectId: number;
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

export default toConverter(intoReview, 'reviewId');
