import Review, { IReviewDbApi } from '$chocolate-frontend/models/Review';
import { supabase } from '$chocolate-frontend/services/api/api';
import { AppError } from '$chocolate-frontend/utils/AppError';
import { SignaturePayload } from '@choc-js/database';

interface IPostReview extends SignaturePayload {
  projectId: number;
  rating: number;
}

async function postReview(params: IPostReview) {
  const response = await supabase.functions.invoke<IReviewDbApi>('app', {
    body: params,
  });

  if (!response.data) {
    const err = new AppError('Error on post review');
    err.cause = response.error;
    throw err;
  }
  const { data } = response;
  return Review.into(data);
}

export { postReview };
