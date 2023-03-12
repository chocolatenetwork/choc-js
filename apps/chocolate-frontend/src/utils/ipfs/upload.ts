import { create } from 'ipfs-http-client';
import { defaultAuthE } from './endpoints';
/**
 * Add some data to an ipfs node
 */
export async function upload(
  BasicAuthorisation: string,
  data: string,
  // Use config instead
  ipfsAuthEndpoint = defaultAuthE.value
) {
  const ipfs = create({
    url: ipfsAuthEndpoint + '/api/v0',
    headers: {
      authorization: BasicAuthorisation,
    },
  });
  const { cid } = await ipfs.add(data);

  return { cid, ipfs };
}
