import { IAddReviewForm } from './AddReviewContent';

export function getAddReviewDefault(projectId: number): IAddReviewForm {
  return {
    rating: 0,
    projectId,
  };
}
