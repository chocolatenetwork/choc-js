import { u8aConcat, u8aToString } from '@polkadot/util';
import { CID } from 'ipfs-http-client';
import all from 'it-all';
import { getApi } from '../api/ipfs';

const exampleData = 'Qmck7nbkQ4VXSL9Yk9vpsgqWaZ8bbViGaTPsV7u9b5N5D1';
/**
 *
 * @example
 * ```js
 *  const address = '5FK12BPMRx3PRmMGJ7RtKbUQ3Us8xau19qvmdfP2sDs1mtJK';
 *  const cid = 'Qmck7nbkQ4VXSL9Yk9vpsgqWaZ8bbViGaTPsV7u9b5N5D1';
 *  signatureMutation.mutateAsync(address).then(async (signature) => {
 *    const perSignData = `${address}:${signature}`;
 *    console.log({ perSignData });
 *    const json = await getIpfs(cid, defaultAuthE.value, perSignData);
 *    console.log({ signature, json });
 *  });
 * ```
 * More examples: https://github.com/ipfs/js-ipfs/blob/master/packages/interface-ipfs-core/src/cat.js
 * @param cid
 * @param UpEndpoint An upload endpoint
 * @param signature User signature and address in format: `${address}:${signature}`
 * @returns
 */
export async function getIpfs(
  cid: string,
  UpEndpoint: string,
  signature: string
) {
  const ipfs = getApi(signature, UpEndpoint);
  const iter = ipfs.cat(CID.parse(cid));
  const array = await all(iter);
  const data = u8aToString(u8aConcat(...array));
  return data;
}
