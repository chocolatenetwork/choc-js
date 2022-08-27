import { Select } from '@mantine/core';
import { EventRecord } from '@polkadot/types/interfaces';
import { useEffect, useState } from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import AccountSelector from '../../../AccountSelector';
import { useLoadAccounts } from '../../../modules/Auth/hooks/useLoadAccounts';
import { useSubstrate } from '../../../substrate-lib';
import { TxButton } from '../../../substrate-lib/components';
import { useApp } from '../../state';
import { AllIds, useReviewSend } from '../hooks/useReviewSend';
import { EventView } from './EventView';
import { FinalNotif } from './FinalNotif';

/** Submit review data as transaction */
const SubmitReviewTx: React.FC<{ id: string; cid: string; rating: number }> = (props) => {
  const [status, setStatus] = useState('');
  const [CurrencyId, setCurrencyId] = useState<AllIds>('DOT');
  const { id, cid, rating } = props;
  const { state } = useApp();
  const { userData } = state;
  const [run, setRun] = useState(false);
  const [event, setEvents] = useState<EventRecord[]>();
  const { keyringState, keyring } = useSubstrate();
  const [stat, setStat] = useState<'sending' | 'error' | 'finalized' | 'init'>(
    'init'
  );
  useLoadAccounts(run, setRun);
  const { data: txFee } = useReviewSend({ id, cid, rating , CurrencyId}, userData.accountAddress);
  useEffect(() => {
    if (/(sending)|(ready)|(inBlock)/i.exec(status)) setStat('sending');
    else if (/finalized/i.exec(status)) setStat('finalized');
    else if (/failed/i.exec(status)) setStat('error');
  }, [event, status]);
  if (!userData.accountAddress && !keyring)
    return (
      <div>
        <p>Please connect your wallet to proceed</p>
        <Button loading={run || undefined} onClick={() => setRun(true)} primary>
          Connect wallet
        </Button>
      </div>
    );
  const accountPair =
    userData.accountAddress &&
    keyringState === 'READY' &&
    keyring &&
    keyring.getPair(userData.accountAddress);
  const currencyIds = ["DOT","KSM","Native","BTC"] as const;
  return (
    <div className='spaced'>
      <Container className='spaced' fluid>
        <Header>Account Paying</Header>
        <AccountSelector />
        <p>Note: a fee of {txFee} will be applied</p>
      </Container>
      <Container className='spaced' fluid>
        <Header>Account Paying</Header>
        <Select label="Currency to store collateral in" value={CurrencyId} onChange={(s: AllIds)=>s && setCurrencyId(s)} data={[...currencyIds]} />
       
      </Container>
      <TxButton
        color='purple'
        disabled={!cid && !accountPair ? true : undefined}
        accountPair={accountPair && accountPair.meta ? accountPair : undefined}
        label='Submit'
        type='SIGNED-TX'
        setEvent={setEvents}
        setStatus={setStatus}
        attrs={{
          palletRpc: 'chocolateModule',
          callable: 'createReview',
          inputParams: [[rating, cid], id,CurrencyId],
          paramFields: [true, true,true],
        }}
      />
      <details placeholder='Events'>{event&&event.length > 0 && <EventView event={event} />}</details>
      <FinalNotif status={status} state={stat} />
    </div>
  );
};
export { SubmitReviewTx };
