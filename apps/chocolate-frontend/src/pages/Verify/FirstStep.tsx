import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Select, Text } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as zod from 'zod';
import putVerifyUser, {
  AccountType,
} from '../../services/queries/putVerifyUser';
import signRaw from '../../services/queries/signRaw';
import { FontWeights } from './StepperContentLayout';
import { ActiveMap } from './Verify';

interface FormData {
  accountType: AccountType;
  message: string;
  signature: string;
}

const schema = zod.object({
  accountType: zod.nativeEnum(AccountType),
  message: zod.string(),
  signature: zod.string(),
});
interface FirstStepProps {
  onSubmit: (signature: string) => void;
  onValidChange: (map: ActiveMap) => void;
  index: number;
  className?: string;
}
function FirstStep(props: FirstStepProps) {
  const { onSubmit, onValidChange, index, ...rest } = props;
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  });
  const accountController = useController({
    control: form.control,
    name: 'accountType',
  });
  const messageController = useController({
    control: form.control,
    name: 'message',
  });

  useEffect(() => {
    form.trigger();
    const unsub = form.watch(() => {
      form.trigger();
    });
    return () => unsub.unsubscribe();
  }, [form]);
  const signatureController = useController({
    control: form.control,
    name: 'message',
  });
  const messageMutation = useMutation(putVerifyUser, {
    onSuccess(data) {
      messageController.field.onChange(data);
    },
  });
  const signatureMutation = useMutation(signRaw, {
    onSuccess(data, variables, context) {
      signatureController.field.onChange(data);
    },
  });

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
          {...accountController.field}
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
        <Button
          variant="default"
          mt={20}
          disabled={accountController.fieldState.invalid}
        >
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
        <Button
          variant="default"
          mt={20}
          disabled={messageController.fieldState.invalid}
        >
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
