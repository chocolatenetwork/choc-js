import { AuthFlow } from '$chocolate-frontend/services/machines/AuthFlow';
import { ErrorReasons } from '$chocolate-frontend/services/machines/AuthFlow.schema';
import { keyringService } from '$chocolate-frontend/services/machines/Keyring';
import { getCurrentUser } from '$chocolate-frontend/services/queries/users/getCurrentUser';
import { AppError, ErrorCodes } from '$chocolate-frontend/utils/AppError';
import { Modal, Text } from '@mantine/core';
import { useDidUpdate } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { useActor, useMachine } from '@xstate/react';
import React from 'react';
import { UnknownErrorPrompt } from './UnkownErrorPrompt';
import { VerifyPrompt } from './VerifyPrompt';

interface AuthenticationFlowProps {
  children: React.ReactNode;
  validate: boolean;
  stop: VoidFunction;
}
export function AuthenticationFlow(props: AuthenticationFlowProps) {
  const { children, validate, stop } = props;
  const [state, send] = useMachine(AuthFlow);
  const [keyringState, sendKeyring] = useActor(keyringService);

  function handleAppErrors(error: AppError) {
    switch (error.code) {
      case ErrorCodes.FetchUserError:
        send({ type: 'Error', reason: ErrorReasons.notVerified });
        break;
      case ErrorCodes.KeyringError:
        sendKeyring('START');
        send({ type: 'Error', reason: ErrorReasons.notConnected });
        break;
      default:
        send({ type: 'Error', reason: ErrorReasons.other });
        break;
    }
  }
  // query user. This starts it all
  const { isLoading } = useQuery({
    queryKey: ['users', 'current'],
    queryFn: getCurrentUser,
    enabled: state.matches('getUser') && validate,
    onSuccess(data) {
      send({ type: 'Success', user: data });
    },
    onError(error) {
      if (error instanceof AppError) {
        handleAppErrors(error);
      } else {
        send({ type: 'Error', reason: ErrorReasons.other });
      }
    },
    retry: false,
  });
  useDidUpdate(() => {
    if (keyringState.matches('Selected')) send('Retry');
    if (keyringState.matches('Idle')) {
      stop();
    }
  }, [keyringState]);
  useDidUpdate(() => {
    // Solve Idle issue with keyring.
    if (keyringState.matches('Idle') && validate) {
      send('Retry');
    }
  }, [validate]);

  // Show children if authed
  if (state.matches('Show')) return <>{children}</>;

  if (isLoading) {
    return (
      <Modal centered opened={validate} onClose={stop}>
        <Text>Loading...</Text>
      </Modal>
    );
  }

  const { context } = state;

  if (
    state.matches('FixError') &&
    context.errorReason === ErrorReasons.notVerified
  ) {
    return (
      <Modal centered opened={validate} onClose={stop}>
        <VerifyPrompt />
      </Modal>
    );
  }

  if (
    state.matches('FixError') &&
    state.context.errorReason === ErrorReasons.other
  ) {
    return (
      <Modal centered opened={validate} onClose={stop}>
        <UnknownErrorPrompt />
      </Modal>
    );
  }

  // Do nothing by default
  return null;
}
