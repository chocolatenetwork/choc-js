import { supabase } from '$chocolate-frontend/services/api/api';
import { AppError } from '$chocolate-frontend/utils/AppError';
import { Any } from '$chocolate-frontend/utils/curry1/types';
import Review, { IReviewDb } from '../../../models/Review';

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
  const reviewsByProject = await supabase
    .from('review')
    .select('*')
    .eq('projectId', id)
    .order(args.sort as Any, { ascending: args.direction === 'ASC' });

  if (reviewsByProject.error) {
    const err = new AppError('Fetch reviews error', undefined, undefined);
    err.cause = reviewsByProject;
    throw err;
  }

  const { data } = reviewsByProject;

  return Review.intoArray(data);
}
