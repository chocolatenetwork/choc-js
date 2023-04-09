import { Rating } from '$chocolate-frontend/components/Rating';
import { formatRating } from '$chocolate-frontend/utils/formatRating';
import { Button } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { StyledDiv } from './AddReviewContent.styles';
import { getAddReviewDefault } from './AddReviewContent.utils';

export interface IAddReviewForm {
  rating: number;
}
export interface AddReviewContentProps {
  onClose: VoidFunction;
  projectName: string;
}
export function AddReviewContent(props: AddReviewContentProps) {
  const { projectName } = props;
  // Just rating for now
  const form = useForm({
    defaultValues: getAddReviewDefault(),
  });
  // todo: mutation, submit.
  // const mutate =  useMutation(postRev)

  return (
    <StyledDiv>
      <Controller
        control={form.control}
        name={'rating'}
        render={({ field }) => {
          return (
            <Rating
              value={field.value}
              onChange={field.onChange}
              description={`Rate ${projectName} on a scale of 5`}
              label={formatRating(field.value)}
            />
          );
        }}
      />
      <Button>Submit</Button>
    </StyledDiv>
  );
}

