import { Router } from 'oak';
import { isIn, isNumber, isString, required } from 'validasaur/src/rules.ts';
import { authSignupController } from '../_controllers/auth/authSignupController.ts';
import { authVerifyController } from '../_controllers/auth/authVerifyController.ts';
import { AccountType } from '../_enums/AccountType.ts';
import { hashBody } from '../_shared/hashBody.ts';
import { requestValidator } from '../_shared/request-validator.ts';
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts';
import { verifyHash } from '../_shared/verifyHash.ts';
import { IBodyBase } from '../_types/IBodyBase.ts';

const router = new Router();

router.post(
  '/signup',
  requestValidator({
    bodyRules: {
      accountType: [required, isIn(Object.values(AccountType))],
      name: [required, isString],
      twitter: [required, isString],
      picture: [isString],
      description: [isString],
      address: [required, isString],
      signature: [required, isString],
    },
  }),
  hashBody(['name', 'twitter', 'picture', 'description', 'accountType']),
  verifyHash(),
  supabaseAdmin(),
  authSignupController()
);

export interface IVerifyBody extends IBodyBase {
  verificationId: number;
}
router.put(
  '/verify',
  requestValidator({
    bodyRules: {
      verificationId: [required, isNumber],
      address: [required, isString],
      signature: [required, isString],
    },
  }),
  hashBody(['verificationId']),
  verifyHash(),
  supabaseAdmin(),
  authVerifyController()
);

export default router;
