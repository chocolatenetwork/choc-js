import {
  defaultAuthE,
  defaultPinE,
} from '$chocolate-frontend/utils/ipfs/endpoints';
import { base64Encode } from '@polkadot/util-crypto';
import { create, IPFSHTTPClient } from 'ipfs-http-client';

export const getIpfsApi = (
  signature: string,
  endpoint = defaultAuthE.value
) => {
  const ipfs = create({
    url: endpoint + '/api/v0',
    headers: {
      authorization: `Basic ${base64Encode(signature)}`,
    },
  });
  return ipfs;
};

export const addPin = async (
  signature: string,
  ipfs: IPFSHTTPClient,
  pinEndpoint = defaultPinE.value
) => {
  const url = new URL(pinEndpoint);

  try {
    await ipfs.pin.remote.service.add(pinEndpoint + '/pins', {
      endpoint: url,
      key: `Bearer ${base64Encode(signature)}`,
    });
    // eslint-disable-next-line no-empty
  } catch {}
};
