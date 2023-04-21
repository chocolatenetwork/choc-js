import { HexString } from '@polkadot/util/types';
import { hashData } from './hashData';

export interface SignaturePayload {
  address: string;
  signature: HexString;
}
interface IMakeSignaturePayload<T extends object> {
  data: T;
  keys: (keyof T)[];
  signRaw: (data: string) => Promise<SignaturePayload>;
}

export async function makeSignaturePayload<T extends object>(
  params: IMakeSignaturePayload<T>
): Promise<T & SignaturePayload> {
  const { data, keys, signRaw } = params;
  const hashed = hashData(data, keys);
  const rawSig = await signRaw(hashed);

  return { ...data, ...rawSig };
}
