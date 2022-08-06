import { ApiPromise, WsProvider } from '@polkadot/api';
import { useEffect } from 'react';
async function testApi() {
  // Import

  // Construct
  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });
  // Do something
  console.log(api.genesisHash.toHex());
}
export function NxWelcome({ title }: { title: string }) {
  useEffect(() => {
    testApi();

    return () => {
      // second
    };
  });

  return <h1>Hi there, I'll be testing polkadot with this component</h1>;
}

export default NxWelcome;
