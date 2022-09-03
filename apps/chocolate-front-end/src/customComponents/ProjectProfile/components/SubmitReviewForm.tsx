import { useAuthService } from '../../../polkadot-apac-hackathon/common/providers/authProvider';
import { useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { SubRev } from '../types';
import { CheckAuthAndGetCid } from './CheckAuthAndGetCid';
import { FormToEnter } from './FormToEnter';
import { SubmitReviewTx as SubmitToChain } from './SubmitReviewTx';
import {
  StageCache,
  CacheAction,
  stageCacheReducer,
  InitialCache,
} from './FormReducer';
import { useStateDeets } from '../hooks/useStateDeets';
import { AccountReducer, unselectedState } from './reducers/AccountReducer';

const SubmitReviewForm: SubRev = function (props) {
  const { proj } = props;
  // get stage from reducer
  const { stage } = useParams<{ stage: string }>();
  // get cid from cache
  const [cache, dispatchCache] = useReducer<
    React.Reducer<StageCache, CacheAction>
  >(stageCacheReducer, InitialCache);
  const { isAuthenticated } = useAuthService();
  // stage1 deets
  const id = proj[1].toHuman();
  const accountCtx = useReducer(AccountReducer, unselectedState);
  const { formProps, initCheckCidProps, initChainProps } = useStateDeets({
    dispatchCache,
    id,
    proj,
    cache,
    isAuthenticated,
    accountCtx,
  });

  // render based on stage
  switch (stage) {
    case '1':
      return <FormToEnter {...formProps} />;
    case '2':
      return <CheckAuthAndGetCid {...initCheckCidProps} />;
    case '3':
      return <SubmitToChain {...initChainProps} />;
    default:
      // render step one by default.
      return <FormToEnter {...formProps} />;
  }
};
export { SubmitReviewForm };
