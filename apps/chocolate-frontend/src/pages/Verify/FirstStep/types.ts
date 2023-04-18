import { IUserVerificationDb } from '$chocolate-frontend/models/UserVerification';
import { AccountType } from '@choc-js/schema';
import { ActiveMap } from '../types';

export interface FirstStepFormData {
  twitter: string;
  // Just for init
  accountType: AccountType;
  name: string;
  signature: string;
  picture?: string;
  description?: string;
}
export interface VerifyData {
  firstStepForm: FirstStepFormData;
  userVerification?: IUserVerificationDb;
}
type UnaryFn<Arg, Return> = (arg: Arg) => Return;
type PartialSetter<T> = UnaryFn<Partial<T> | UnaryFn<T, Partial<T>>, void>;
export interface FirstStepProps {
  sync: PartialSetter<VerifyData>;
  defaultValues: VerifyData;
  onValidChange: (map: ActiveMap) => void;
  index: number;
  className?: string;
}
