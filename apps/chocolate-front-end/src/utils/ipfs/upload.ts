import { AuthIpfsEndpoint } from '@polkadot/apps-config';
import { getAuthIPFSEndpoints, getPinEndpoints } from './endpoints';
import create from 'ipfs-http-client';

export const defaultAuthE = getAuthIPFSEndpoints()[0];
export const defaultPinE = getPinEndpoints()[0];
/**
 * Add some data to an ipfs node
 */
async function upload(
  BasicAuthorisation: string,
  data: string,
  // Use config instead
  ipfsAuthEndpoint: AuthIpfsEndpoint = defaultAuthE
) {
  const UpEndpoint = ipfsAuthEndpoint.value;
  const ipfs = create({
    url: UpEndpoint + '/api/v0',
    headers: {
      authorization: BasicAuthorisation,
    },
  });
  const { cid } = await ipfs.add(data);

  return cid;
}
