import uploadIpfs from '$chocolate-frontend/services/queries/ipfs/uploadIpfs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Select, TextInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as zod from 'zod';
import signRaw from '../../../services/queries/signRaw';
import putVerifyUser from '../../../services/queries/verify/putVerifyUser';
import { AccountType } from '../../../services/queries/verify/types';
import { getErrorMsg } from '../../../utils/getErrorMsg';
import { FirstStepFormData, FirstStepProps } from './types';

const schema = zod.object({
  accountType: zod.nativeEnum(AccountType),
  message: zod.string().min(1),
  signature: zod.string().min(1),
  name: zod.string().min(1),
  picture: zod.string().url(),
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
      signatureController.field.onChange(data.signature);
    },
  });

  const uploadMetaMutation = useMutation(uploadIpfs, {
    onSuccess() {
      // Do messageMutation and signatureMutation next
    },
  });

  const messageError = getErrorMsg(messageMutation);
  const signatureError = getErrorMsg(signatureMutation);
  const doGenerateMessage = () => {
    const accountType = form.getValues('accountType');
    console.log(accountType);
    if (!accountType) return;
    messageMutation.mutate(accountType);
  };
  const doSignMessage = () => {
    signatureMutation.mutate(form.getValues('message'));
  };
  // method set to post as the signature is sensitive.
  return (
    <div {...rest}>
      <div>
        <Select
          label="Account Type"
          required
          placeholder="Select Account Type.."
          data={Object.values(AccountType)}
          {...accountController.field}
        />
      </div>
      <div className="FirstStep_InputGroup">
        <TextInput
          label="Name"
          required
          className="TextContainer"
          {...form.register('name')}
        />

        <TextInput
          label={'Profile Picture'}
          required
          className="TextContainer"
          {...form.register('picture')}
        />
      </div>
      <div className="FirstStep_InputGroup">
        <div>
          <TextInput
            label="Message"
            readOnly
            className="TextContainer"
            error={messageError}
            {...messageController.field}
          />
          <Button
            variant="default"
            mt={20}
            disabled={accountController.fieldState.invalid}
            onClick={doGenerateMessage}
          >
            Generate Message
          </Button>
        </div>
        <div>
          <TextInput
            label={'Signature'}
            readOnly
            className="TextContainer"
            error={signatureError}
            {...signatureController.field}
          />
          <Button
            variant="default"
            mt={20}
            disabled={messageController.fieldState.invalid}
            onClick={doSignMessage}
          >
            Sign Message
          </Button>
        </div>
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
    opacity: 1;
    :read-only {
      background-color: var(--mantine-color-gray-1);
      cursor: not-allowed;
    }
  }
  .FirstStep_InputGroup {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: baseline;
    column-gap: 10px;
  }
`;
