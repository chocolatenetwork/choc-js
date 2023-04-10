import { mockApi } from '$chocolate-frontend/services/api/api';
import Review, { IReviewDb, IReviewDbApi } from '../../../models/Review';


interface Filter {
  sort?: string;
  direction?: 'ASC' | 'DESC' | undefined;
}
interface IGetReviewsByProject extends Filter {
  id: string;
}

export async function getReviewsByProject(
  args: IGetReviewsByProject
): Promise<IReviewDb[]> {
  const { id } = args;

  const paramsObj = {
    projectId: id,
    _sort: args.sort || '',
    _order: args.direction || '',
  };
  const filtered = Object.entries(paramsObj).filter((each) => {
    return String(each[1]).length > 0;
  });
  const params = new URLSearchParams(filtered);

  const { data } = await mockApi.get<IReviewDbApi[]>(`/reviews`, { params });

  return Review.intoArray(data);
}
