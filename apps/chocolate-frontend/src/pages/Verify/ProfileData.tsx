import { AccountType } from '@choc-js/schema';
import { Textarea, TextInput } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { FirstStepFormData } from './FirstStep/types';

interface IProfileData {
  form: UseFormReturn<FirstStepFormData>;
  accountType: AccountType;
}
export function ProfileData({ form, accountType }: IProfileData) {
  const isProject = accountType === AccountType.Project;
  const nameLabel = () => {
    if (isProject) return 'Project Name';
    return 'Username';
  };
  const pictureLabel = () => {
    if (isProject) return 'Logo';
    return 'Profile Picture';
  };

  return (
    <>
      <div className="FirstStep_InputGroup">
        <TextInput label={nameLabel()} required {...form.register('name')} />

        <TextInput
          label={'Twitter url'}
          required
          {...form.register('twitter')}
        />
      </div>
      <div className="FirstStep_InputGroup--fw">
        <TextInput label={pictureLabel()} {...form.register('picture')} />
      </div>
      {isProject && (
        <div className="FirstStep_InputGroup--fw">
          <Textarea {...form.register('description')} label="Description" />
        </div>
      )}
    </>
  );
}
