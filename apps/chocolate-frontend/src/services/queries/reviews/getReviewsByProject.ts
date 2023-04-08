import { mockApi } from '$chocolate-frontend/services/api/api';
import Review, { IReviewDb, IReviewDbApi } from '../../../models/Review';

export async function getReviewsByProject(id: string): Promise<IReviewDb[]> {
  const { data } = await mockApi.get<IReviewDbApi[]>(
    `/reviews?projectProjectId=${id}`
  );

  return Review.intoArray(data);
}
