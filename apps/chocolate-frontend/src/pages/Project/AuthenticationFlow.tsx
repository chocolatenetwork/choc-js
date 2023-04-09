import { AuthFlow } from '$chocolate-frontend/services/machines/AuthFlow';
import { ErrorReasons } from '$chocolate-frontend/services/machines/AuthFlow.schema';
import { keyringService } from '$chocolate-frontend/services/machines/Keyring';
import { getCurrentUser } from '$chocolate-frontend/services/queries/users/getCurrentUser';
import { AppError, ErrorCodes } from '$chocolate-frontend/utils/AppError';
import { useDidUpdate } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { useActor, useMachine } from '@xstate/react';
import React from 'react';

interface AuthenticationFlowProps {
  children: React.ReactNode;
  validate: boolean;
}
export function AuthenticationFlow(props: AuthenticationFlowProps) {
  const { children, validate } = props;
  const [state, send] = useMachine(AuthFlow);
  const [keyringState, sendKeyring] = useActor(keyringService);
  console.log('Auth Flow rendered', state.context);
  function handleAppErrors(error: AppError) {
    switch (error.code) {
      case ErrorCodes.FetchUserError:
        send({ type: 'Error', reason: ErrorReasons.notVerified });
        return;
      case ErrorCodes.KeyringError:
        sendKeyring('START');
        send({ type: 'Error', reason: ErrorReasons.notConnected });
        return;

      default:
        break;
    }
  }
  // query user. This starts it all
  useQuery({
    queryKey: ['users', 'current'],
    queryFn: getCurrentUser,
    enabled: state.matches('getUser') && validate,
    onSuccess(data) {
      send({ type: 'Success', user: data });
    },
    onError(error) {
      if (error instanceof AppError) {
        handleAppErrors(error);
      }
      // Todo: catch-all
    },
    retry: false,
  });
  useDidUpdate(() => {
    if (keyringState.matches('Selected')) send('connected');
  }, [keyringState]);

  // Show children if matches
  if (state.matches('Show')) return <>{children}</>;

  // DO nothing by default
  return null;
}
