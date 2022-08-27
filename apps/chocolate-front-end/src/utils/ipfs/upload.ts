import create from 'ipfs-http-client';
import config from '../../config';
import { getAuthIPFSEndpoints, getPinEndpoints } from './endpoints';
import { AuthIpfsEndpoint } from './types';

const plainUrl =config.IPFS_API_SERVER;

export const defaultAuthE = getAuthIPFSEndpoints()[0];
export const defaultPinE = getPinEndpoints()[0];
/**
 * Add some data to an ipfs node
 */
export async function upload(
  BasicAuthorisation: string,
  data: string,
  // Use config instead
  ipfsAuthEndpoint: AuthIpfsEndpoint = defaultAuthE
) {
  let UpEndpoint = ipfsAuthEndpoint.value;
  if(process.env.NODE_ENV === "development") UpEndpoint = plainUrl;
  
  const ipfs = create({
    url: UpEndpoint + '/api/v0',
    headers: {
      authorization: BasicAuthorisation,
    },

  });
  const { cid } = await ipfs.add(data);

  return {cid, ipfs};
}

