import { mockApi } from '$chocolate-frontend/services/api/api';
import { IReviewDb } from '../../../models/Review';

export async function getReviewsByProject(id: string): Promise<IReviewDb[]> {
  const { data } = await mockApi.get<IReviewDb[]>(
    `/reviews?projectProjectId=${id}`
  );
  return data;
}
