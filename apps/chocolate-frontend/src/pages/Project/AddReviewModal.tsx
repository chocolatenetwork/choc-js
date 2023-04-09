import { Modal } from '@mantine/core';
import {
  AddReviewContent,
  AddReviewContentProps,
} from './AddReviewContent/AddReviewContent';

interface AddReviewModalProps extends AddReviewContentProps {
  opened: boolean;
}
export function AddReviewModal(props: AddReviewModalProps) {
  const { opened, ...rest } = props;
  return (
    <Modal opened={opened} onClose={rest.onClose} title="Add a review" centered>
      <AddReviewContent {...rest} />
    </Modal>
  );
}
