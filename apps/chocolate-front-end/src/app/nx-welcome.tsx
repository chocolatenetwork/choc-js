import { ApiPromise, WsProvider } from '@polkadot/api';
import { useState } from 'react';
let $api: ApiPromise | null = null;

async function testApi(
  setGenesis: React.Dispatch<React.SetStateAction<string>>,
  setApiReady: React.Dispatch<React.SetStateAction<boolean>>
) {
  // Import

  // Construct
  const wsProvider = new WsProvider('ws://127.0.0.1:8844');
  const api = await ApiPromise.create({ provider: wsProvider });
  // This call is typed
  console.log((await api.query['chocolateModule']['projects'](1)).toHuman());
  console.log('Established ApiPromise');
  const l = await api.query['chocolateModule']['projects'](1);
  const t = l.unwrapOrDefault();
  
  console.log(t.toPrimitive());

  // Do something
  await api.isReadyOrError
    .then((_api) => {
      setApiReady(true);
      setGenesis(_api.genesisHash.toHex());
    })
    .catch(() => setApiReady(false));
  const handleDis = () => {
    setApiReady(false);
    setGenesis('');
  };
  api.on('disconnected', handleDis);

  $api = api;
}

export function NxWelcome({ title }: { title: string }) {
  const [apiReady, setApiReady] = useState(false);
  const [genesis, setGenesis] = useState('');
  const ready = 'Api is Ready';
  const nr = 'Api is not Ready';
  return (
    <main data-test-id="test-api-main">
      <h1>Api Stats:</h1>

      <p>
        Ready State: {apiReady ? ready : nr} <br />
        Genesis Hash: {genesis}
      </p>
      <button
        onClick={() => {
          if ($api) $api.disconnect();
          testApi(setGenesis, setApiReady);
        }}
      >
        Test Api
      </button>
    </main>
  );
}

export default NxWelcome;
