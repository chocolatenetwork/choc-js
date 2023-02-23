import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Select, TextInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as zod from 'zod';
import putVerifyUser, {
  AccountType,
} from '../../services/queries/putVerifyUser';
import signRaw from '../../services/queries/signRaw';
import { getErrorMsg } from '../../utils/getErrorMsg';
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
    onSuccess(data) {
      signatureController.field.onChange(data);
    },
  });

  // Todo: Impl first step.
  const message = messageMutation.data;
  const signature = signatureMutation.data;

  const messageError = getErrorMsg(messageMutation);
  const signatureError = getErrorMsg(signatureMutation);

  const submitHandler: SubmitHandler<FormData> = (data) => {
    onSubmit(data.signature);
  };
  // method set to post as the signature is sensitive.
  return (
    <form {...rest} method="POST" onSubmit={form.handleSubmit(submitHandler)}>
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
          <TextInput
            label="Message"
            className="TextContainer"
            disabled
            value={message}
            error={messageError}
          />
        </div>
        <Button
          variant="default"
          mt={20}
          disabled={accountController.fieldState.invalid}
          onClick={() => {
            messageMutation.mutate(form.getValues('accountType'));
          }}
        >
          Generate Message
        </Button>
      </div>
      <div>
        <TextInput
          label={'Signature'}
          className="TextContainer"
          disabled
          value={signature}
          error={signatureError}
        />
        <Button
          variant="default"
          mt={20}
          type="submit"
          disabled={messageController.fieldState.invalid}
          onClick={() => {
            signatureMutation.mutate(form.getValues('message'));
          }}
        >
          Sign Message
        </Button>
      </div>
    </form>
  );
}

export default styled(FirstStep)`
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  .mantine-TextInput-input {
    border: 1px solid var(--mantine-color-gray-4);
    background-color: var(--mantine-color-gray-0);
    opacity: 1;
  }
`;
