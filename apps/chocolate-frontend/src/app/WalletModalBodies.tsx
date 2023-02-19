import { Button } from '@mantine/core';
import { KeyringMachineState } from '../services/machines/Keyring';
import { KeyringMachineSender } from '../services/machines/Keyring.schema';
import { SelectAccounts } from './SelectAccounts';

interface WalletModalBodiesProps {
  state: KeyringMachineState;
  send: KeyringMachineSender;
}
export function WalletModalBodies({ state, send }: WalletModalBodiesProps) {
  if (state.matches('Loading')) {
    return <div>Loading accounts...</div>;
  }
  if (state.matches('Error')) {
    return (
      <div>
        {state.context.errorMessage}
        <Button onClick={() => send('RETRY')}>Retry</Button>{' '}
        <Button onClick={() => send('CANCEL')}>Exit</Button>
      </div>
    );
  }
  if (state.matches('Selecting')) {
    return <SelectAccounts send={send} state={state} />;
  }
  return null;
}
