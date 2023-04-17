import { CID, create } from 'ipfs-http-client';
import { defaultPinE } from './endpoints';

export async function pin(
  BearerAuth: string,
  cid: CID,
  ipfs: ClientType,
  pinEndpoint = defaultPinE.value
) {
  const url = new URL(pinEndpoint);

  try {
    await ipfs.pin.remote.service.add(pinEndpoint + '/pins', {
      endpoint: url,
      key: BearerAuth,
    });
  } catch (e) {
    // only e is service not present. Muffle it.
    console.error(e);
  }

  const cidOrN = await ipfs.pin.add(cid);

  if (!cidOrN) throw new Error('Pin Error');
  return cidOrN;
}

type ClientType = ReturnType<typeof create>;
