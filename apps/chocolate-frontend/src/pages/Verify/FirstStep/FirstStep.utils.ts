import { AccountType } from '@choc-js/schema';

import * as zod from 'zod';

const AccountTypeNameDictionary: Record<AccountType, string> = {
  project: 'Project',
  user: 'User',
};
export function makeAccountTypeData() {
  return Object.values(AccountType).map((each) => {
    return {
      value: each,
      label: AccountTypeNameDictionary[each],
    };
  });
}

const emptyStringToUndefined = (
  value: string | undefined
): string | undefined => {
  if (value === '') return undefined;
  return value;
};
export const schema = zod.object({
  accountType: zod.nativeEnum(AccountType),
  name: zod.string().min(1),
  twitter: zod.string().url(),
  picture: zod
    .string()
    .url()
    .optional()
    .or(zod.literal(''))
    .transform(emptyStringToUndefined),
  description: zod.string().optional(),
});
