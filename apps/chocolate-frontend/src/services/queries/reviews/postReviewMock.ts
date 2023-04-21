import Review, { IReviewDbApi } from '$chocolate-frontend/models/Review';
import { mockApi } from '$chocolate-frontend/services/api/api';
import { getKeyring } from '$chocolate-frontend/utils/apiSetup/getKeyring';

interface IPostReview {
  projectId: number;
  rating: number;
}
export async function postReviewMock(params: IPostReview) {
  const { selectedAccount } = getKeyring();
  // create review
  const review: Partial<IReviewDbApi> = {
    projectId: params.projectId,
    rating: params.rating,
    userId: selectedAccount.address,
    createdAt: new Date().toJSON(),
    updatedAt: new Date().toJSON(),
  };
  const { data } = await mockApi.post<IReviewDbApi>('/reviews', review);

  return Review.into(data);
}
