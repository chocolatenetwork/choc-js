import { useEffect } from 'react';
import { useProfileData } from './useProject';
import { CheckCidProps } from '../components/CheckAuthAndGetCid';
import { LocalFormProps } from '../components/FormToEnter';
import { StageCache, CacheAction } from '../components/FormReducer';
import { ChocolatePrimitivesProjectsProject } from '@polkadot/types/lookup';
import { u32 } from '@polkadot/types';

interface StateDeets {
  formProps: LocalFormProps;
  initCheckCidProps: CheckCidProps;
  initChainProps: {
    id: string;
    cid: string;
    rating: number;
  };
}
type StateDeetsArgs = {
  dispatchCache: React.Dispatch<CacheAction>;
  id: string;
  proj: [ChocolatePrimitivesProjectsProject, u32];
  cache: StageCache;
  isAuthenticated: boolean;
  accountCtx: CheckCidProps['accountCtx'];
};

export function useStateDeets({
  dispatchCache,
  id,
  proj,
  cache,
  isAuthenticated,
  accountCtx,
}: StateDeetsArgs): StateDeets {
  useEffect(() => {
    dispatchCache({ type: 'initialise', id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const profileQ = useProfileData(proj);
  const formProps: LocalFormProps = {
    id,
    projectName: profileQ.data?.project.metadata.name,
    dispatchCache,
    cachedForm: cache.stage1,
  };
  // stage2 deets
  const initCheckCidProps: CheckCidProps = {
    ...cache.stage1,
    isAuthenticated,
    dispatchCache,
    accountCtx,
  };
  // stage3 deets
  const initChainProps = {
    id,
    cid: cache.stage2,
    rating: cache.stage1.rating,
  };
  return { formProps, initCheckCidProps, initChainProps };
}
