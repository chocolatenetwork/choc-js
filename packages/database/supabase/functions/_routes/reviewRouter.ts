import { Router } from 'oak';

const reviewRouter = new Router();
reviewRouter
  // Note: path should be prefixed with function name
  .post('/', (context) => {
    context.response.body =
      'This is an example Oak server running on Edge Functions!, review root';
  });
export default reviewRouter;
