import { KeyringMachineState } from '$chocolate-frontend/services/machines/Keyring';
import { KeyringMachineSender } from '$chocolate-frontend/services/machines/Keyring.schema';
import { Button, Text } from '@mantine/core';
import styled from 'styled-components';
interface AccountsErrorProps {
  state: KeyringMachineState;
  send: KeyringMachineSender;
  className?: string;
}
function AccountsError(props: AccountsErrorProps) {
  const { send, state, ...rest } = props;
  return (
    <div {...rest}>
      <Text>{state.context.errorMessage}</Text>
      <div>
        <Button onClick={() => send('RETRY')}>Retry</Button>
        <Button onClick={() => send('CANCEL')}>Exit</Button>
      </div>
    </div>
  );
}

export default styled(AccountsError)``;
