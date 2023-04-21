import { assign, createMachine, interpret, Receiver, Sender } from 'xstate';
import { noop } from '../../utils/noop';
import { createApi } from '../api/api';
import { ApiContext, ApiEvents } from './Api.schema';
const initialContext: ApiContext = {} as ApiContext;
/**
 * Diagram: https://stately.ai/registry/editor/cc96d11e-2aad-49fa-a60a-b481de12be06?machineId=a2272bff-7580-40ac-915e-9aaab0e92944
 */
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
        contract: (_, event) => event.api,
      }),
      unsetApi: assign(initialContext),
    },
    services: {
      createApi: () => (send) => {
        const contract = createApi(send);
        let unsub: VoidFunction = noop;
        contract.then((unsubFn) => {
          unsub = unsubFn;
        });

        // Closure is needed so unsub can be updated.
        return () => unsub();
      },
    },
  }
);
export type ApiMachineSender = Sender<ApiEvents>;
export type ApiMachineReceiver = Receiver<ApiEvents>;

export const apiService = interpret(ApiMachine); // Only start machine when using api.
