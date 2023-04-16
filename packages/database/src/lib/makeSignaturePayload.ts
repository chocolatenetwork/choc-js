import { HexString } from '@polkadot/util/types';
import { hashData } from './hashData';

interface SignaturePayload {
  address: string;
  signature: HexString;
}
interface IMakeSignaturePayload<T extends Record<string, unknown>> {
  data: T;
  keys: string[];
  signRaw: (data: string) => Promise<SignaturePayload>;
}

export async function makeSignaturePayload<T extends Record<string, unknown>>(
  params: IMakeSignaturePayload<T>
): Promise<T & SignaturePayload> {
  const { data, keys, signRaw } = params;
  const hashed = hashData(data, keys);
  const rawSig = await signRaw(hashed);

  return { ...data, ...rawSig };
}
