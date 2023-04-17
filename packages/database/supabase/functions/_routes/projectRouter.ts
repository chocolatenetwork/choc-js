import { arrayRange } from '@polkadot/util';
import { Router } from 'oak';
import { isIn, isNumber, isString, required } from 'validasaur/src/rules.ts';
import { createReviewController } from '../_controllers/projects/createReviewController.ts';
import { UserRole } from '../_enums/UserRole.ts';
import { hashBody } from '../_shared/hashBody.ts';
import { requestValidator } from '../_shared/request-validator.ts';
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts';
import { verifyHash } from '../_shared/verifyHash.ts';
import { withUser } from '../_shared/withUser.ts';

const reviewRange = arrayRange(5, 1);
const projectRouter = new Router();
projectRouter
  // Note: path should be prefixed with function name
  .post(
    '/review',
    requestValidator({
      bodyRules: {
        projectId: [required, isNumber],
        rating: [required, isIn(reviewRange)],
        signature: [required, isString],
        address: [required, isString],
      },
    }),
    hashBody(['projectId', 'rating']),
    verifyHash(),
    supabaseAdmin(),
    withUser([UserRole.normal, UserRole.admin]),
    createReviewController()
  );

export default projectRouter;
