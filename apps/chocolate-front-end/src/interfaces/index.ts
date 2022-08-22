import { PalletChocolateCall } from '@polkadot/types/lookup';

export {
  ChocolatePrimitivesProjectsProject as Project,
  ChocolatePrimitivesProjectsProject as ProjectAl,
  ChocolatePrimitivesProjectsReview as Review,
  ChocolatePrimitivesProjectsReview as ReviewAl,
  ChocolatePrimitivesUsersUser as User,
} from '@polkadot/types/lookup';

export type ProjectID = PalletChocolateCall['asAcceptProject']['projectId'];
