import { assign, createMachine, interpret, Receiver, Sender } from 'xstate';
import { noop } from '../../utils/noop';
import { createApi } from '../api/api';
import { ApiContext, ApiEvents } from './Api.schema';
const initialContext: ApiContext = {} as ApiContext;

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
export type ApiMachineSender = Sender<ApiEvents>;
export type ApiMachineReceiver = Receiver<ApiEvents>;

export const apiService = interpret(ApiMachine).start();
