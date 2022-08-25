import { web3Accounts, web3FromSource, } from '@polkadot/extension-dapp';
import { KeyringPair } from '@polkadot/keyring/types';
import { getW3AuthSignature } from '../../utils/ipfs/getW3AuthSignature';
import { pin } from '../../utils/ipfs/pin';
import { upload } from '../../utils/ipfs/upload';
import IPFS from 'ipfs-http-client';
import type { ClientOptions } from 'ipfs-http-client/src/lib/core';
import config from '../../config';
import { PinServerRes } from '../../typeSystem/appTypes';
import { ReviewContent } from '../../typeSystem/jsonTypes';
import { errorHandled } from '../utils';
// for use with ipfs cat
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line no-unused-vars
const plainUrl = new URL(config.IPFS_API_SERVER);
const ipfsConfig = {
  protocol: plainUrl.protocol,
  host: plainUrl.hostname,
  port: Number(plainUrl.port),
  apiPath: 'api/v0',
} as ClientOptions;

type GetCidReturns = { cid: string };
async function devGetCid(reviewText: string, rating: number): Promise<GetCidReturns> {
  const node = IPFS(ipfsConfig);
  const cacheable: ReviewContent = { reviewText, rating };

  const addRes = await node.add(JSON.stringify(cacheable));
  const subdomainSafeCid = addRes.cid.toV1().toString('base36');
  return { cid: subdomainSafeCid };
}
const getCid = async function (
  reviewText: string,
  rating: number,
  // acnt?: Awaited<ReturnType<typeof web3Accounts>>[number]
  pair: KeyringPair
): Promise<GetCidReturns> {
  const cacheable: ReviewContent = { reviewText, rating };
  if (process.env.NODE_ENV === 'development')
    return devGetCid(reviewText, rating);

    const injector = await web3FromSource(pair ? pair.meta.source as string:'');
    const signature =await getW3AuthSignature({} as KeyringPair,injector.signer);
    const up =await upload(( signature).AuthBasic, JSON.stringify(cacheable));
    const pined = await pin(( signature).AuthBearer,up.toV0().toString("base32"), `Review-${pair?.address}`);

  return { cid: up.toV0().toString("base32") };
};
export { getCid };
