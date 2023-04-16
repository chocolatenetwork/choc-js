import { Router } from 'oak';
import { isIn, isString, required } from 'validasaur/src/rules.ts';
import { hashBody } from './utils/hashBody.ts';
import { requestValidator } from './utils/request-validator.ts';
import { verifyHash } from './utils/verifyHash.ts';

enum AccountType {
  project = 'project',
  user = 'user',
}
const router = new Router();
const signupSchema = {
  accountType: [required, isIn(Object.values(AccountType))],
  address: [required, isString],
  signature: [required, isString],
  name: [required, isString],
  twitter: [isString],
  picture: [isString],
  description: [isString],
};

router.post(
  '/signup',
  requestValidator({ bodyRules: signupSchema }),
  hashBody(['name', 'twitter', 'picture', 'description', 'accountType']),
  verifyHash(),
  async (context) => {
    const body2 = context.request.body({ limit: 0, type: 'json' });

    context.response.body = { received: await body2.value };
  }
);

router.post('/verify', (context) => {
  context.response.body =
    'This is an example Oak server running on Edge Functions!, verify route';
});

export default router;
