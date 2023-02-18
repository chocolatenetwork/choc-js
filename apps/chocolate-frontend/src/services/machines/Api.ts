import { ContractPromise } from '@polkadot/api-contract';
import { assign, createMachine, interpret, Receiver, Sender } from 'xstate';
import { createApi } from '../api/api';
export interface ApiContext {
  api: ContractPromise;
}
const initialContext: ApiContext = {} as ApiContext;

type ApiEvents =
  | { type: 'CONNECT' }
  | { type: 'DISCONNECT' }
  | { type: 'CONNECT_SUCCESS'; api: ContractPromise }
  | { type: 'ERROR' };

export const ApiMachine = createMachine(
  {
    id: 'Api',
    invoke: {
      src: 'createApi',
      id: 'createApi',
    },
    initial: 'Loading',
    states: {
      Disconnected: {
        entry: 'unsetApi',
        on: {
          CONNECT: {
            target: 'Loading',
          },
        },
      },
      Loading: {},
      Connected: {
        entry: 'setApi',
        on: {
          DISCONNECT: {
            target: 'Disconnected',
          },
        },
      },
    },
    on: {
      CONNECT_SUCCESS: {
        target: '.Connected',
      },
      ERROR: {
        target: '.Disconnected',
      },
    },
    schema: {
      context: {} as ApiContext,
      events: {} as ApiEvents,
    },
    tsTypes: {} as import('./Api.typegen').Typegen0,
    context: initialContext,
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      setApi: assign({
        api: (_, event) => event.api,
      }),
      unsetApi: assign(initialContext),
    },
    services: {
      createApi: () => (send) => {
        const contract = createApi(send);
        let unsub: VoidFunction = noop;
        contract.then((contract) => {
          unsub = () => contract.api.disconnect();
        });

        return () => unsub;
      },
    },
  }
);
// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}
export type ApiMachineSender = Sender<ApiEvents>;
export type ApiMachineReceiver = Receiver<ApiEvents>;

export const apiService = interpret(ApiMachine).start();

