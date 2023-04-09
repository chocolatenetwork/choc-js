import { AuthFlow } from '$chocolate-frontend/services/machines/AuthFlow';
import { useMachine } from '@xstate/react';
import React from 'react';

interface AuthenticationFlowProps {
  children: React.ReactNode;
}
export function AuthenticationFlow(props: AuthenticationFlowProps) {
  const [state, send] = useMachine(AuthFlow);
  // query user
  //  handle transitions in callback
  return <div>AuthenticationFlow</div>;
}
