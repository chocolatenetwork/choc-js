import { Text } from '@mantine/core';
import { KeyringMachineState } from '../services/machines/Keyring';
import { KeyringMachineSender } from '../services/machines/Keyring.schema';
import AccountsError from './AccountsError';
import SelectAccounts from './SelectAccounts';

export interface WalletModalBodiesProps {
  state: KeyringMachineState;
  send: KeyringMachineSender;
}
export function WalletModalBodies({ state, send }: WalletModalBodiesProps) {
  if (state.matches('Loading')) {
    return <Text>Loading accounts...</Text>;
  }
  if (state.matches('Error')) {
    return <AccountsError send={send} state={state} />;
  }
  if (state.matches('Selecting')) {
    return <SelectAccounts send={send} state={state} />;
  }
  return null;
}
