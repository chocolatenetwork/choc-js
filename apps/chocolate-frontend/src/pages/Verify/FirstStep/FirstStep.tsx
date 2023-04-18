import { postInitiateVerification } from '$chocolate-frontend/services/queries/verify/postInitiateVerification';
import { noop } from '$chocolate-frontend/utils/noop';
import { makeSignaturePayload } from '@choc-js/database';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Select, TextInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import styled from 'styled-components';
import signRaw from '../../../services/queries/signRaw';
import { getErrorMsg } from '../../../utils/getErrorMsg';
import { ProfileData } from '../ProfileData';
import { makeAccountTypeData, schema } from './FirstStep.utils';
import { FirstStepFormData, FirstStepProps } from './types';

function FirstStep(props: FirstStepProps) {
  const { sync, onValidChange, index, defaultValues, ...rest } = props;
  const form = useForm<FirstStepFormData>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: defaultValues.firstStepForm,
  });

  const accountController = useController({
    control: form.control,
    name: 'accountType',
  });

  const signatureController = useController({
    control: form.control,
    name: 'signature',
  });

  useEffect(() => {
    form.trigger();
    const unsub = form.watch((values) => {
      sync({ firstStepForm: values as FirstStepFormData });
    });
    return () => unsub.unsubscribe();
  }, [form]);

  const signatureMutation = useMutation(signRaw, {
    onSuccess(data) {
      signatureController.field.onChange(data.signature);
    },
  });
  const submitMutation = useMutation(postInitiateVerification, {
    onSuccess(data) {
      sync({ userVerification: data });
      onValidChange({ [index]: true });
    },
  });

  const signatureError = getErrorMsg(signatureMutation);

  const doSignBody = () => {
    form.handleSubmit(async (values) => {
      const signed = await makeSignaturePayload({
        data: values,
        keys: ['accountType', 'description', 'name', 'picture', 'twitter'],
        signRaw: signatureMutation.mutateAsync,
      }).catch(noop);
      if (!signed) return;
      submitMutation.mutate(signed);
    });
  };
  // method set to post as the signature is sensitive.
  return (
    <div {...rest}>
      <div>
        <Select
          label="Account Type"
          required
          placeholder="Select Account Type.."
          data={makeAccountTypeData()}
          {...accountController.field}
        />
      </div>
      <ProfileData form={form} accountType={accountController.field.value} />
      <div className="FirstStep_InputGroup FirstStep_InputGroup--fw">
        <div>
          <TextInput
            label={'Signature'}
            readOnly
            error={signatureError}
            {...signatureController.field}
          />
          <Button
            variant="default"
            mt={20}
            onClick={doSignBody}
            disabled={!form.formState.isValid}
          >
            Submit
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
    grid-template-columns: 1fr 1fr;
    align-items: baseline;
    column-gap: 10px;
  }
  .FirstStep_InputGroup--fw {
    grid-template-columns: 1fr;
  }
`;
