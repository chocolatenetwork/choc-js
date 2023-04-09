import { Modal } from '@mantine/core';
import {
  AddReviewContent,
  AddReviewContentProps,
} from './AddReviewContent/AddReviewContent';
import { AuthenticationFlow } from './AuthenticationFlow';

interface AddReviewModalProps extends AddReviewContentProps {
  opened: boolean;
}
export function AddReviewModal(props: AddReviewModalProps) {
  const { opened, ...rest } = props;
  return (
    <AuthenticationFlow validate={opened}>
      <Modal
        opened={opened}
        onClose={rest.onClose}
        title="Add a review"
        centered
      >
        <AddReviewContent {...rest} />
      </Modal>
    </AuthenticationFlow>
  );

}
