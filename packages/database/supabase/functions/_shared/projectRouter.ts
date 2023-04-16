import { Router } from 'oak';

const projectRouter = new Router();
projectRouter
  // Note: path should be prefixed with function name
  .post('/', (context) => {
    context.response.body =
      'This is an example Oak server running on Edge Functions!, project root';
  });

export default projectRouter;
