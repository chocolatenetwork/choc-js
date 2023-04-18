import { AccountType } from '@choc-js/schema';
import { VerifyData } from './FirstStep/types';

export function makeVerifyData(): VerifyData {
  return {
    firstStepForm: {
      accountType: AccountType.User,
      signature: '',
      name: '',
      twitter: '',
    },
  };
}
