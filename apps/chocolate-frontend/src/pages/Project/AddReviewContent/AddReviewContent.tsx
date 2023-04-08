import { Rating } from '$chocolate-frontend/components/Rating';
import { useForm } from 'react-hook-form';
import { getAddReviewDefault } from './AddReviewContent.utils';

export interface IAddReviewForm {
  rating: number;
}
interface AddReviewContentProps {
  close: VoidFunction;
}
export function AddReviewContent(props: AddReviewContentProps) {
  // Just rating for now
  const form = useForm({
    defaultValues: getAddReviewDefault(),
  });
  // todo: mutation, submit.
  // const mutate =  useMutation(postRev)
  return (
    <div className="body">
      <Rating />;<div className="bottom"></div>
    </div>
  );
}
