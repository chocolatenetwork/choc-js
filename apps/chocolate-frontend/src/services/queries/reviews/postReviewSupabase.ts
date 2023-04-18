import Review, { IReviewDbApi } from '$chocolate-frontend/models/Review';
import { functionsApi } from '$chocolate-frontend/services/api/api';
import { SignaturePayload } from '@choc-js/database';

interface IPostReview extends SignaturePayload {
  projectId: number;
  rating: number;
}

async function postReview(params: IPostReview) {
  const { data } = await functionsApi.post<IReviewDbApi>(
    'app/projects/review',
    {
      body: params,
    }
  );

  return Review.into(data);
}

export { postReview };
