import CID from 'cids';
import create from 'ipfs-http-client';
import { getPinEndpoints } from './endpoints';
export const defaultPinE = getPinEndpoints()[0];

export async function pin(
  BearerAuth: string,
  cid: CID,
  ipfs: ClientType,
  pinEndpoint = defaultPinE.value
) {
  // const pinRes = await addPinnerAndPin(ipfs);
  const url = new URL(pinEndpoint);

  try {
    ipfs.pin.remote.service.add(pinEndpoint + '/pins', {
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
