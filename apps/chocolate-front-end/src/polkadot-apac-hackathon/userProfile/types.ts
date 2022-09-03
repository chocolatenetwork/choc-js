import { HumanTableSetReview } from '../../typeSystem/jsonTypes';

type TableReducerActionTypes =
  | 'FILTER_PROJECT_NAME'
  | 'FILTER_REVIEW_RATING'
  | 'INITIALISE'
  | 'FILTER_REVIEW_STATUS';
interface TableReducerActionBase {
  type: TableReducerActionTypes;
  status?: string;
}
interface TableReducerActionInitialise {
  type: 'INITIALISE';
  payload: HumanTableSetReview[];
}
interface TableReducerActionFilterReviewRating {
  type: 'FILTER_REVIEW_RATING';
  rating: number;
}
interface TableReducerActionFPN {
  type: 'FILTER_PROJECT_NAME';
  projectID: number;
}
export type TableReducerAction =
  | TableReducerActionInitialise
  | TableReducerActionFilterReviewRating
  | TableReducerActionFPN;
