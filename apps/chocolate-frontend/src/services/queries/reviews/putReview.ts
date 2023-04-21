import Review, { IReviewDbApi } from '$chocolate-frontend/models/Review';
import { functionsApi } from '$chocolate-frontend/services/api/api';
import { SignaturePayload } from '@choc-js/database';
export interface IPutReview extends SignaturePayload {
  projectId: number;
  rating: number;
}

export async function putReview(params: IPutReview) {
  const { data } = await functionsApi.put<IReviewDbApi>(
    'app/projects/review',

    params
  );

  return Review.into(data);
}
