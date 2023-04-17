import { assign, createMachine } from 'xstate';
import { AuthFlowContext, AuthFlowEvents } from './AuthFlow.schema';

const initialContext: AuthFlowContext = {};

export const AuthFlow = createMachine(
  {
    id: 'AuthFlow',
    description:
      'Generalise to Error-> handleError -> onError.\n\nAlso add a default for, we were unable to check your account, if not verified check...',
    initial: 'getUser',
    states: {
      getUser: {
        entry: 'resetState',
        on: {
          Success: {
            target: 'Show',
            description: 'Maybe add setUser',
          },
          Error: {
            target: 'FixError',
            actions: 'setError',
          },
        },
      },
      Show: {
        type: 'final',
      },
      FixError: {
        on: {
          Retry: {
            target: 'getUser',
          },
        },
      },
    },
    schema: {
      events: {} as AuthFlowEvents,
      context: {} as AuthFlowContext,
    },
    tsTypes: {} as import('./AuthFlow.typegen').Typegen0,
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      setError: assign({
        errorReason: (_, event) => event.reason,
      }),
      resetState: () => initialContext,
    },
  }
);
