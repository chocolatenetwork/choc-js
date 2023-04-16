import { blake2AsHex } from '@polkadot/util-crypto';
import { Middleware } from 'oak';
import { stringify } from 'safe-stable-stringify';

export function hashBody(keys: string[]): Middleware {
  return async (ctx, next) => {
    const bodyValue = ctx.request.body({ type: 'json' });


    const bodyJson = await bodyValue.value;

    const mappedEntries = Object.entries(bodyJson).filter((value) => {
      return keys.includes(value[0]);
    });

    const hex = hashData(Object.fromEntries(mappedEntries));
    ctx.state.hashHex = hex;
    // body.hashHex = hex;
    await next();
    delete ctx.state.hashHex;
  };
}

function hashData(object: Record<string, unknown>) {
  const objectstring = stringify(object);
  const hex = blake2AsHex(objectstring);
  return hex;
}
