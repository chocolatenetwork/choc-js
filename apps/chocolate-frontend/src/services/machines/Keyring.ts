import { assign, createMachine } from 'xstate';
import { enableAndLoadAll } from '../api/keyring';
import {
  KeyringContext,
  KeyringEvents,
  KeyringServices,
} from './Keyring.schema';
const initialContext: KeyringContext = {
  selectedAccount: null,
  accounts: [],
  errorMessage: '',
};
const errorMap: Record<string, string> = {
  '404.Extensions': 'Cannot find any extensions to load accounts from',
  '404.Accounts': 'Cannot find any accounts loaded from extensions',
  defaultError: 'Unknown Error',
};
export const keyringMachine = createMachine(
  {
    id: 'Wallet',
    initial: 'Idle',
    states: {
      Idle: {
        on: {
          START: {
            target: 'Loading',
          },
        },
      },
      Loading: {
        invoke: {
          src: 'loadAllAccounts',
          onDone: [
            {
              target: 'Selecting',
              actions: 'updateAccounts',
            },
          ],
          onError: [
            {
              target: 'Error',
              actions: 'parseError',
            },
          ],
        },
      },
      Selecting: {
        on: {
          'SELECT-ACCOUNT': {
            target: 'Selected',
            actions: 'updateSelected',
          },
          CANCEL: {
            target: 'Idle',
          },
        },
      },
      Selected: {
        description:
          'Choose to get signer inline.\n\nhttps://github.com/substrate-developer-hub/substrate-front-end-template/blob/e36c75de93a8fbd6a40b374129fbfa50a2bff16d/src/substrate-lib/components/TxButton.js#L46',
      },
      Error: {
        on: {
          RETRY: {
            target: 'Loading',
          },
          CANCEL: {
            target: 'Idle',
          },
        },
      },
    },
    on: {
      DISCONNECT: {
        target: '.Idle',
      },
    },
    schema: {
      context: {} as KeyringContext,
      events: {} as KeyringEvents,
      services: {} as KeyringServices,
    },
    tsTypes: {} as import('./Keyring.typegen').Typegen0,
    context: initialContext,
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      updateAccounts: assign({
        accounts: (_, event) => {
          return event.data as KeyringServices['loadAllAccounts']['data'];
        },
      }),
      updateSelected: assign({
        selectedAccount: (_, event) => event.selectedAccount,
      }),
      parseError: assign({
        errorMessage: (_, event) =>
          errorMap[String(event.data)] ?? errorMap.defaultError,
      }),
    },
    services: {
      loadAllAccounts: enableAndLoadAll,
    },
  }
);
