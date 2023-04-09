import { createMachine } from 'xstate';

export const AuthFlow = createMachine({
  id: 'AuthFlow',
  initial: 'getUser',
  states: {
    getUser: {
      on: {
        Success: {
          target: 'Show',
        },
        Error: [
          {
            target: 'connectWallet',
            cond: 'notConnected',
          },
          {
            target: 'verify',
            cond: 'notVerified',
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
    events: {} as
      | { type: 'Success' }
      | { type: 'Error' }
      | { type: 'connected' },
  },
  predictableActionArguments: true,
  preserveActionOrder: true,
});
