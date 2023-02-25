import { AccountType } from '../../services/queries/putVerifyUser';
import { ActiveMap } from './Verify';

export interface FirstStepFormData {
  accountType: AccountType;
  message: string;
  signature: string;
}
type UnaryFn<Arg, Return> = (arg: Arg) => Return;
type PartialSetter<T> = UnaryFn<Partial<T> | UnaryFn<T, Partial<T>>, void>;
export interface FirstStepProps {
  sync: PartialSetter<Partial<FirstStepFormData>>;
  defaultValues: Partial<FirstStepFormData>;
  onValidChange: (map: ActiveMap) => void;
  index: number;
  className?: string;
}
