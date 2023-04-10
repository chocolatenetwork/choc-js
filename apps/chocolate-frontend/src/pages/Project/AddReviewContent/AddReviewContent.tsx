import { Rating } from '$chocolate-frontend/components/Rating';
import { IProjectDb } from '$chocolate-frontend/models/Project';
import { patchProject } from '$chocolate-frontend/services/queries/project/patchProject';
import { postReview } from '$chocolate-frontend/services/queries/reviews/postReview';
import { formatRating } from '$chocolate-frontend/utils/formatRating';
import { Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { StyledDiv } from './AddReviewContent.styles';
import { getAddReviewDefault } from './AddReviewContent.utils';

export interface IAddReviewForm {
  rating: number;
}
export interface AddReviewContentProps {
  onClose: VoidFunction;
  project: IProjectDb;
}
export function AddReviewContent(props: AddReviewContentProps) {
  const { project, onClose } = props;
  // Just rating for now
  const form = useForm({
    defaultValues: getAddReviewDefault(),
  });
  // todo: mutation, submit.
  const mutate = useMutation(postReview, {
    async onSuccess(data) {
      // for now.
      await patchProject({
        projectId: project.id,
        ratingSum: (project.ratingSum += data.rating),
        reviewCount: (project.reviewCount += 1),
      });
      onClose();
    },
  });
  // Todo: add auth required
  const doMutate = form.handleSubmit((data) => {
    return mutate.mutate({
      projectId: project.id,
      rating: data.rating,
    });
  });
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
              description={`Rate ${project.name} on a scale of 5`}
              label={formatRating(field.value)}
            />
          );
        }}
      />
      <Button onClick={() => doMutate()}>Submit</Button>
    </StyledDiv>
  );
}

