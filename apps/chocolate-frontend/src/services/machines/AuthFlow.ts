import { assign, createMachine } from 'xstate';
import {
  AuthFlowContext,
  AuthFlowEvents,
  ErrorReasons,
} from './AuthFlow.schema';

const initialContext: AuthFlowContext = {};
export const AuthFlow = createMachine(
  {
    id: 'AuthFlow',
    initial: 'getUser',
    context: initialContext,
    states: {
      getUser: {
        on: {
          Success: {
            target: 'Show',
            actions: 'resetState',
          },
          Error: [
            {
              target: 'connectWallet',
              cond: 'notConnected',
              actions: 'setError',
            },
            {
              target: 'verify',
              cond: 'notVerified',
              actions: 'setError',
            },
          ],
        },
      },
      Show: {
        type: 'final',
      },
      connectWallet: {
        on: {
          connected: {
            target: 'getUser',
          },
        },
      },
      verify: {
        type: 'final',
      },
    },
    schema: {
      events: {} as AuthFlowEvents,
      context: {} as AuthFlowContext,
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./AuthFlow.typegen').Typegen0,
  },
  {
    guards: {
      notVerified: (_, event) => {
        return event.reason === ErrorReasons.notVerified;
      },
      notConnected: (_, event) => {
        return event.reason === ErrorReasons.notConnected;
      },
    },
    actions: {
      setError: assign({
        errorReason: (_, event) => event.reason,
      }),
      resetState: () => initialContext,
    },
  }
);
