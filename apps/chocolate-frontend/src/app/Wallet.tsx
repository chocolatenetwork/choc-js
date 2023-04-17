import { Button, Modal, Text } from '@mantine/core';
import { useActor } from '@xstate/react';
import styled from 'styled-components';
import { keyringService } from '../services/machines/Keyring';
import { WalletModalBodies } from './WalletModalBodies';

interface WalletProps {
  className?: string;
}
function Wallet(props: WalletProps) {
  const [state, send] = useActor(keyringService);
  function getWalletContent() {
    if (['Loading', 'Error', 'Selecting', 'Idle'].some(state.matches)) {
      return (
        <div>
          <Button onClick={() => send('START')}>Connect Your Wallet</Button>
          <Modal
            opened={['Loading', 'Error', 'Selecting'].some(state.matches)}
            onClose={() => send('CANCEL')}
            centered
            title="Connect Wallet"
            closeOnClickOutside={false}
          >
            <WalletModalBodies state={state} send={send} />
          </Modal>
        </div>
      );
    }

    return <Text>{state.context.selectedAccount?.address}</Text>;
  }

  return <div {...props}>{getWalletContent()}</div>;
}

export default styled(Wallet)``;
