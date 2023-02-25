import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Select, TextInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as zod from 'zod';
import putVerifyUser, {
  AccountType,
} from '../../../services/queries/putVerifyUser';
import signRaw from '../../../services/queries/signRaw';
import { getErrorMsg } from '../../../utils/getErrorMsg';
import { FirstStepFormData, FirstStepProps } from './types';

const schema = zod.object({
  accountType: zod.nativeEnum(AccountType),
  message: zod.string().min(1),
  signature: zod.string().min(1),
});
function FirstStep(props: FirstStepProps) {
  const { sync, onValidChange, index, defaultValues, ...rest } = props;
  const form = useForm<FirstStepFormData>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues,
  });

  const accountController = useController({
    control: form.control,
    name: 'accountType',
  });
  const messageController = useController({
    control: form.control,
    name: 'message',
  });

  const signatureController = useController({
    control: form.control,
    name: 'signature',
  });

  useEffect(() => {
    form.trigger();
    const unsub = form.watch((values) => {
      sync(values);
    });
    return () => unsub.unsubscribe();
  }, [form]);

  useEffect(() => {
    onValidChange({ [index]: form.formState.isValid });
  }, [form.formState.isValid, index]);

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

  const messageError = getErrorMsg(messageMutation);
  const signatureError = getErrorMsg(signatureMutation);
  // method set to post as the signature is sensitive.
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
          <TextInput
            label="Message"
            disabled
            className="TextContainer"
            error={messageError}
            {...messageController.field}
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
          disabled
          className="TextContainer"
          error={signatureError}
          {...signatureController.field}
        />
        <Button
          variant="default"
          mt={20}
          disabled={messageController.fieldState.invalid}
          onClick={() => {
            signatureMutation.mutate(form.getValues('message'));
          }}
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

  .mantine-TextInput-input {
    border: 1px solid var(--mantine-color-gray-4);
    background-color: var(--mantine-color-gray-0);
    opacity: 1;
  }
`;
