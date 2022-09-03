import Keyring from '@polkadot/keyring';

interface SetS {
  state: 'selected';
  addr: string;
  // Avoid having to reach for it.
  keyring: Keyring;
}
export interface UnsetS {
  state: 'unselected';
  addr: null;
  keyring: null;
}
export type StateType = SetS | UnsetS;
interface SetA {
  type: 'set';
  addr: string;
  keyring: Keyring;
}
interface Unset {
  type: 'unset';
}
export type ActionType = SetA | Unset;
export type DispatchType = React.Dispatch<ActionType>;
