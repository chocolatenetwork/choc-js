import { mockApi } from '$chocolate-frontend/services/api/api';
import Review, { IReviewDb, IReviewDbApi } from '../../../models/Review';

export async function getReviewsByProject(id: string): Promise<IReviewDb[]> {
  const params = new URLSearchParams([['projectId', id]]);

  const { data } = await mockApi.get<IReviewDbApi[]>(`/reviews`, { params });

  return Review.intoArray(data);
}
