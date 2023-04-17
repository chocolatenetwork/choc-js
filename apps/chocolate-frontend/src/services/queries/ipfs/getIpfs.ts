import { u8aConcat, u8aToString } from '@polkadot/util';
import { CID } from 'ipfs-http-client';
import all from 'it-all';
import { getIpfsApi } from '../../api/ipfs';

interface GetIPFSParams {
  cid: string;
  /**
   *  An upload endpoint
   */
  UpEndpoint: string;
  /**
   *  User signature and address in format: `${address}:${signature}`
   */
  signature: string;
}

/**
 *
 * @example
 * ```js
 *  const address = '5FK12BPMRx3PRmMGJ7RtKbUQ3Us8xau19qvmdfP2sDs1mtJK';
 *  const cid = 'Qmck7nbkQ4VXSL9Yk9vpsgqWaZ8bbViGaTPsV7u9b5N5D1';
 *  signatureMutation.mutateAsync(address).then(async (signature) => {
 *    const perSignData = `${address}:${signature}`;
 *    console.log({ perSignData });
 *    const json = await getIpfs({
 *            cid,
 *            signature: perSignData,
 *            UpEndpoint: defaultAuthE.value,
 *         });
 *    console.log({ signature, json });
 *  });
 * ```
 * More examples: https://github.com/ipfs/js-ipfs/blob/master/packages/interface-ipfs-core/src/cat.js

 * @returns
 */
export async function getIpfs(params: GetIPFSParams) {
  const { cid, signature, UpEndpoint } = params;
  const ipfs = getIpfsApi(signature, UpEndpoint);
  const iter = ipfs.cat(CID.parse(cid));
  const array = await all(iter);
  const data = u8aToString(u8aConcat(...array));
  return data;
}
