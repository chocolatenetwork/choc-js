import { oakCors } from 'cors';
import { Application, Router } from 'oak';
import authRouter from '../_routes/authRouter.ts';
import projectRouter from '../_routes/projectRouter.ts';
import reviewRouter from '../_routes/reviewRouter.ts';
import { logError } from '../_shared/logError.ts';

const corsList = {
  local: ['http://localhost:4200'],
  development: [
    new RegExp(/^https:\/\/[\w\d]+--chocolatenetwork\.netlify\.app$/, 'gm'),
  ],
  production: ['https://chocolatenetwork.netlify.app'],
};
const env = Deno.env.get('APP_ENV') as keyof typeof corsList | undefined;

const router = new Router();
router
  // Note: path should be prefixed with function name
  .use('/app/projects', projectRouter.routes(), projectRouter.allowedMethods())
  .use('/app/reviews', reviewRouter.routes(), reviewRouter.allowedMethods())
  .use('/app/auth', authRouter.routes(), authRouter.allowedMethods());

const app = new Application();
app.addEventListener('error', logError);
app.use(
  oakCors({
    origin: corsList[env || 'local'],
  })
);
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
