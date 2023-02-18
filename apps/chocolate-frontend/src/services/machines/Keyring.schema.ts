import { Receiver, Sender, ServiceMap } from 'xstate';
import { InjectedAccountWithMeta } from '../api/types';

export interface KeyringContext {
  selectedAccount: InjectedAccountWithMeta | null;
  accounts: InjectedAccountWithMeta[];
  errorMessage: string;
}
export interface KeyringServices extends ServiceMap {
  loadAllAccounts: {
    data: InjectedAccountWithMeta[];
  };
}
export type KeyringEvents =
  | {
      type: 'START';
    }
  | {
      type: 'SELECT-ACCOUNT';
      selectedAccount: InjectedAccountWithMeta;
    }
  | {
      type: 'RETRY';
    }
  | {
      type: 'UPDATE';
      selectedAccount: InjectedAccountWithMeta;
      accounts: InjectedAccountWithMeta[];
    }
  | {
      type: 'CANCEL';
    }
  | {
      type: 'DISCONNECT';
    };

export type KeyringMachineSender = Sender<KeyringEvents>;
export type KeyringMachineReceiver = Receiver<KeyringEvents>;
