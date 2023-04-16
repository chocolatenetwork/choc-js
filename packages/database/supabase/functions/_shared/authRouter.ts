import { Router } from 'oak';

const authRouter = new Router();
authRouter
  // Note: path should be prefixed with function name
  .post('/signup', (context) => {
    context.response.body =
      'This is an example Oak server running on Edge Functions!, signup route';
  })
  .post('/verify', (context) => {
    context.response.body =
      'This is an example Oak server running on Edge Functions!, verify route';
  });

export default authRouter;
