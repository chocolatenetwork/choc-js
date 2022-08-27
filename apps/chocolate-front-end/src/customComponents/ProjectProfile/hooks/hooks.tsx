import { KeyringPair } from '@polkadot/keyring/types';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useQuery, UseQueryResult } from 'react-query';
import { SubstrateReadyCTX } from '../../../Layouts/app/InnerAppProvider';
import { getCid } from '../majorUtils';
type UseCidReturns = UseQueryResult<{ cid: string }, Error>;
const useCid = function (isSubmitted: boolean, reviewText: string, rating: number,caller: KeyringPair): UseCidReturns {
  const queryId = ['cid', reviewText, rating];
  const {api} = useContext(SubstrateReadyCTX);
  // https://stackoverflow.com/questions/62340697
  return useQuery(queryId, () => getCid(reviewText, rating,caller,api), {
    enabled: isSubmitted,
    onError: () => toast.error(`Something went wrong fetching your review's cid`),
    staleTime: Infinity,
  });
};

export default useCid;
