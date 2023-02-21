import { Button, Select, Text } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import putVerifyUser, {
  AccountType,
} from '../../services/queries/putVerifyUser';
import { FontWeights } from './StepperContentLayout';
import { ActiveMap } from './Verify';
interface FirstStepProps {
  onSubmit: (signature: string) => void;
  onValidChange: (map: ActiveMap) => void;
  index: number;
  className?: string;
}
function FirstStep(props: FirstStepProps) {
  const { onSubmit, onValidChange, index, ...rest } = props;
  const messageMutation = useMutation(putVerifyUser);
  const signatureMutation = useMutation(putVerifyUser);
  // Todo: Impl first step.
  const message =
    'bb282cd8089975d581648e730defd6a39fe4d23c089a082fa538968a3e5990be';
  const signature =
    '1b985bd00eaf2a58695450f313103d5ed10a22c46bb2e11a49a9e1fe50ca7dee';
  return (
    <div {...rest}>
      <div>
        <Select
          label="Account Type"
          placeholder="Select Account Type.."
          data={Object.values(AccountType)}
        />
      </div>
      <div>
        <div>
          <Text size={'sm'} fw={FontWeights.bold}>
            Message
          </Text>
          <Text className="TextContainer" ta="center" c="dimmed">
            {message}
          </Text>
        </div>
        <Button variant="default" mt={20}>
          Generate Message
        </Button>
      </div>
      <div>
        <Text size={'sm'} fw={FontWeights.bold}>
          Signature
        </Text>
        <Text className="TextContainer" ta="center" c="dimmed">
          {signature}
        </Text>
        <Button variant="default" mt={20}>
          Sign Message
        </Button>
      </div>
    </div>
  );
}

export default styled(FirstStep)`
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  .TextContainer {
    min-height: 36px;
  }
`;