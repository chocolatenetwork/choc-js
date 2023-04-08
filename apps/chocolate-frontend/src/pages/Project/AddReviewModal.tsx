import { Modal } from '@mantine/core';
import { AddReviewContent } from './AddReviewContent/AddReviewContent';

interface AddReviewModalProps {
  opened: boolean;
  onClose: VoidFunction;
}
export  function AddReviewModal(props: AddReviewModalProps) {
  const { opened, onClose } = props;
  return (
    <Modal opened={opened} onClose={onClose}>
      <AddReviewContent close={onClose} />
    </Modal>
  );
}
