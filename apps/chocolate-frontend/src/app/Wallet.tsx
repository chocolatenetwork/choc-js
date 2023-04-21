import { ReactComponent as UserCircle } from '$chocolate-frontend/assets/svg/user-circle.svg';
import { getCurrentUser } from '$chocolate-frontend/services/queries/users/getCurrentUser';
import { Button, Image, Modal, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '@xstate/react';
import styled from 'styled-components';
import { keyringService } from '../services/machines/Keyring';
import { Connected, TextWrap } from './Wallet.styles';
import { WalletModalBodies } from './WalletModalBodies';

interface WalletProps {
  className?: string;
}
const USER_PROFILE_IMAGE_SIZE = 48;

function Wallet(props: WalletProps) {
  const [state, send] = useActor(keyringService);
  const { data } = useQuery({
    queryKey: ['users', 'current'],
    queryFn: getCurrentUser,
    enabled: state.matches('Selected'),
    retry: false,
  });
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

    return (
      <Connected>
        <TextWrap>
          <Text lineClamp={1}>{state.context.selectedAccount?.address}</Text>
        </TextWrap>
        <Image
          src={data?.picture || null}
          withPlaceholder
          width={USER_PROFILE_IMAGE_SIZE}
          height={USER_PROFILE_IMAGE_SIZE}
          radius={5}
          placeholder={
            <UserCircle
              width={USER_PROFILE_IMAGE_SIZE}
              height={USER_PROFILE_IMAGE_SIZE}
            />
          }
        />
      </Connected>
    );
  }

  return <div {...props}>{getWalletContent()}</div>;
}

export default styled(Wallet)``;
