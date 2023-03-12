import { AccountType } from '$chocolate-frontend/services/queries/verify/putVerifyUser';
import { ActiveMap } from '../types';

export interface FirstStepFormData {
  accountType: AccountType | null;
  message: string;
  signature: string;
}
type UnaryFn<Arg, Return> = (arg: Arg) => Return;
type PartialSetter<T> = UnaryFn<Partial<T> | UnaryFn<T, Partial<T>>, void>;
export interface FirstStepProps {
  sync: PartialSetter<FirstStepFormData>;
  defaultValues: FirstStepFormData;
  onValidChange: (map: ActiveMap) => void;
  index: number;
  className?: string;
}
