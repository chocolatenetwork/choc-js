import { Application, Router } from 'oak';
import authRouter from '../_shared/authRouter.ts';
import { logError } from '../_shared/logError.ts';
import projectRouter from '../_shared/projectRouter.ts';
import reviewRouter from '../_shared/reviewRouter.ts';

const router = new Router();
router
  // Note: path should be prefixed with function name
  .use('/app/projects', projectRouter.routes(), projectRouter.allowedMethods())
  .use('/app/reviews', reviewRouter.routes(), reviewRouter.allowedMethods())
  .use('/app/auth', authRouter.routes(), authRouter.allowedMethods());

const app = new Application();
app.addEventListener('error', logError);
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
