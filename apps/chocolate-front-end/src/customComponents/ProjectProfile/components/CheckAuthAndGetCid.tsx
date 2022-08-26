import { KeyringPair } from '@polkadot/keyring/types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Loader } from 'semantic-ui-react';
import { useCid } from '../hooks';
import { CacheAction, Stage1Cache } from './FormReducer';
import {
  StateType as AccountState,
  DispatchType as AccountRedDispatch,
} from './reducers/AccountReducer.types';
import Keyring from '@polkadot/keyring';
import AccountSelector from '../../../AccountSelector';
import { OnAddrChange } from '../../../typeSystem/appTypes';
import { useLoadAccounts } from '../../../modules/Auth/hooks/useLoadAccounts';

export interface CheckCidProps extends Stage1Cache {
  isAuthenticated: boolean;
  dispatchCache: React.Dispatch<CacheAction>;
  accountCtx: [state: AccountState, dispatch: AccountRedDispatch];
}

const CheckAuthAndGetCid: React.FC<CheckCidProps> = function (props) {
  // first, check if auth
  const { accountCtx, comment, rating, dispatchCache } = props;
  const [runLoad, setRunLoad] = useState(false);
  const [aState, setAState] = useState<'loading-cid' | 'done' | 'init' | 'init-select'>('init');
  
  const [addrState, dispatch] = accountCtx;
  let caller: KeyringPair | null = null;
  if (addrState.state === 'selected') {
    const { addr, keyring } = addrState;
    caller = keyring.getPair(addr);
  }
  const { isLoading, isError, data ,refetch,isFetching} = useCid(
    aState === 'loading-cid' && addrState.state === 'selected',
    comment,
    rating,
    // Will only be accessed when truthy
    caller as KeyringPair
  );

  const params = useParams<{ id: string }>();
  const id = params.id as string; //  Only valid ids pass initial api fetch. Will never be undefined

  const navigate = useNavigate();
  useEffect(() => {
    // dispatch next action only if cid is available
    if (!data) {
      return;
    }
    const { cid } = data;
    dispatchCache({ type: 'stage2', stage2: cid, id });
    setAState('done');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, data, id]);

  useLoadAccounts(runLoad,setRunLoad);
  if (aState === 'init-select') {
    return (
      <>
        {' '}
        <AccountSelector onAddrChange={handleAddrChange(dispatch)} />
        <Button color="green" onClick={()=>{ setAState('loading-cid')}}>Confirm</Button>
      </>
    );
  }
  if (aState==='init')
    return (
      <div>
        <p>Please connect your wallet to proceed</p>
        <Button onClick={() => {setAState('init-select'); setRunLoad(true);}} primary>
          Connect wallet
        </Button>
      </div>
    );

  if (aState=== 'done') navigate(`/project/${id}/stage/3`);

      
  let text = <p> Fetching your review's cid...</p>;
  if(isError){
    if(!isFetching){
      text = (
        <>
          <p>
            Something Went wrong fetching your review's cid...please refetch
          </p>
          <Button onClick={()=>refetch()}>Refetch</Button>
        </>
      );
    }
    text = <p> <i>Still</i> Fetching your review's cid...</p>;
  }
  return (
    <Container fluid>
     {text}
      <Loader />
    </Container>
  );
};
export { CheckAuthAndGetCid };

function handleAddrChange(dispatch: AccountRedDispatch): OnAddrChange {
  return (addr: string, keyring: Keyring) => {
    dispatch({ type: 'set', addr, keyring });
  };
}
