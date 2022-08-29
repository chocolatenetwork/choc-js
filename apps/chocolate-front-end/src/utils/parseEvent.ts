import { ApiPromise } from '@polkadot/api';
import { AugmentedEvents } from '@polkadot/api/types';
import { Event } from '@polkadot/types/interfaces';

export function parseEvent(
  api: ApiPromise,
  event: Event,
  ...callbacks: CBs
): [EvType, string] | null {
  const [success, fail] = callbacks;
  if (api.events.system.ExtrinsicSuccess.is(event)) {
    // extract the data for this event
    // (In TS, because of the guard above, these will be typed)
    const parsedEvent = handleSuccess(event);
    success?.(parsedEvent, event);
    return parsedEvent;
  }
  if (api.events.system.ExtrinsicFailed.is(event)) {
    const parsedEvent = handleFailed(api, event);
    fail?.(parsedEvent, event);
    return parsedEvent;
  }
  return null;
}

function handleSuccess(event: SuccessEvent) {
  const { section, method } = event;
  const [dispatchInfo] = event.data;
  const successInfo = `${section}.${method}:: ExtrinsicSuccess:: ${JSON.stringify(
    dispatchInfo.toHuman()
  )}`;
  console.log(successInfo);
  const arr = ['Success', successInfo] as const;
  return arr as Writeable<typeof arr>;
}

/**
 * Handle failed extrinsics. Throw with the text needed
 */
function handleFailed(api: ApiPromise, event: FailureEvent): ParsedEvent {
  const { section, method } = event;
  // extract the data for this event
  const [dispatchError] = event.data;
  let errorInfo;

  // decode the error
  if (dispatchError.isModule) {
    // for module errors, we have the section indexed, lookup
    // (For specific known errors, we can also do a check against the
    // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
    const decoded = api.registry.findMetaError(dispatchError.asModule);

    errorInfo = `${decoded.section}.${decoded.name}`;
  } else {
    // Other, CannotLookup, BadOrigin, no extra info
    errorInfo = dispatchError.toString();
  }
  const errString = `${section}.${method}:: ExtrinsicFailed:: ${errorInfo}`;
  console.error(errString);
  const arr = ['Failed', errString] as const;
  return arr as Writeable<typeof arr>;
}
type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export type EvType = 'Failed' | 'Success';
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export type GuardedType<T> = T extends (x: any) => x is infer T ? T : never;
type IsSuccessEvent =
  AugmentedEvents<'promise'>['system']['ExtrinsicSuccess']['is'];
type IsFailureEvent =
  AugmentedEvents<'promise'>['system']['ExtrinsicFailed']['is'];
type SuccessEvent = GuardedType<IsSuccessEvent>;
type FailureEvent = GuardedType<IsFailureEvent>;
type ParsedEvent = [EvType, string];
type EventCB<T> = (parsedEvent: ParsedEvent, originalEvent: T) => void;
export type CBs = [
  successCB?: EventCB<SuccessEvent>,
  failedCB?: EventCB<FailureEvent>
];