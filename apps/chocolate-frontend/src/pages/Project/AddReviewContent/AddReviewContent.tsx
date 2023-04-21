import { Rating } from '$chocolate-frontend/components/Rating';
import { IProjectDb } from '$chocolate-frontend/models/Project';
import { putReview } from '$chocolate-frontend/services/queries/reviews/putReview';
import signRaw from '$chocolate-frontend/services/queries/signRaw';
import { formatRating } from '$chocolate-frontend/utils/formatRating';
import { noop } from '$chocolate-frontend/utils/noop';
import { makeSignaturePayload } from '@choc-js/database';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import zod from 'zod';
import { StyledDiv } from './AddReviewContent.styles';
import { getAddReviewDefault } from './AddReviewContent.utils';
export interface IAddReviewForm {
  rating: number;
  projectId: number;
}
export interface AddReviewContentProps {
  onClose: VoidFunction;
  project: IProjectDb;
}

const schema = zod.object({
  rating: zod.number().min(1).max(5),
  projectId: zod.number(),
});
export function AddReviewContent(props: AddReviewContentProps) {
  const { project, onClose } = props;
  // Just rating for now
  const form = useForm({
    defaultValues: getAddReviewDefault(project.id),
    resolver: zodResolver(schema),
  });
  const { isValid } = form.formState;
  const queryClient = useQueryClient();
  const signatureMutation = useMutation(signRaw);
  const mutate = useMutation(putReview, {
    onSuccess() {
      queryClient.invalidateQueries(['project', 'reviews', project.id]);
      onClose();
    },
  });

  const doMutate = form.handleSubmit(async (data) => {
    const signed = await makeSignaturePayload({
      data,
      keys: ['rating', 'projectId'],
      signRaw: signatureMutation.mutateAsync,
    }).catch(noop);
    if (!signed) return;

    mutate.mutate(signed);
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
      <Button
        onClick={() => doMutate()}
        loading={mutate.isLoading}
        disabled={!isValid}
      >
        Submit
      </Button>
    </StyledDiv>
  );
}
