import { Button, Modal } from '@mantine/core';
import { useActor } from '@xstate/react';
import styled from 'styled-components';
import { keyringService } from '../services/machines/Keyring';
import { WalletModalBodies } from './WalletModalBodies';

interface WalletProps {
  className?: string;
}
function Wallet(props: WalletProps) {
  const [state, send] = useActor(keyringService);
  if (['Loading', 'Error', 'Selecting', 'Idle'].some(state.matches)) {
    return (
      <div {...props}>
        <Button onClick={() => send('START')}>Connect Your Wallet</Button>
        <Modal
          opened={['Loading', 'Error', 'Selecting'].some(state.matches)}
          onClose={() => send('CANCEL')}
        >
          <WalletModalBodies state={state} send={send} />
        </Modal>
      </div>
    );
  }

  return <div {...props}>{state.context.selectedAccount?.address}</div>;
}

export default styled(Wallet)``;
