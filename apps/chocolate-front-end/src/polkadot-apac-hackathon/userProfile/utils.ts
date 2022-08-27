import { HumanTableSetReview } from '../../typeSystem/jsonTypes';
import { TableReducerAction } from './types';

export const tableReducer = (
  state: HumanTableSetReview[],
  action: TableReducerAction
) => {
  switch (action.type) {
    case 'FILTER_PROJECT_NAME':
      return state.filter(
        (review) => review.projectId === action.projectID.toString()
      );
    case 'FILTER_REVIEW_RATING':
      return state.filter((review) => review.content.rating === action.rating);
    case 'INITIALISE':
      return action.payload;
    default:
      return state;
  }
};
