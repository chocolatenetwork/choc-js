import { AugmentedSubmittables } from '@polkadot/api/types/submittable';
type AugSubs = AugmentedSubmittables<'promise'>;
export interface TxButtonProps {
  accountPair?: any;
  setEvent?: (events: any) => void;
  label: any;
  setStatus: (s: string) => void;
  color?: string;
  style?: any;
  type?:
    | 'QUERY'
    | 'UNCHECKED-SUDO-TX'
    | 'UNSIGNED-TX'
    | 'SIGNED-TX'
    | 'RPC'
    | 'CONSTANT';
  attrs?: Attrs;
  disabled?: boolean;
}
interface Attrs {
  palletRpc: keyof AugSubs;
  //  Todo: Improve types
  callable: string;
  /** Parameters required for the callable function */
  inputParams: any[];
  /**Enable the input params passed */
  paramFields: boolean[];
}
