import { oakCors } from 'cors';
import { Application, Router } from 'oak';
import authRouter from '../_routes/authRouter.ts';
import projectRouter from '../_routes/projectRouter.ts';
import reviewRouter from '../_routes/reviewRouter.ts';
import { logError } from '../_shared/logError.ts';
import { resendErrors } from '../_shared/resendErrors.ts';

const corsList = {
  local: ['http://localhost:4200'],
  development: [/(chocolatenetwork\.netlify\.app)$/],
  production: ['https://chocolatenetwork.netlify.app'],
};
const env = Deno.env.get('APP_ENV') as keyof typeof corsList | undefined;
const origin = corsList[env || 'development'];

const router = new Router();
router
  // Note: path should be prefixed with function name
  .use('/app/projects', projectRouter.routes(), projectRouter.allowedMethods())
  .use('/app/reviews', reviewRouter.routes(), reviewRouter.allowedMethods())
  .use('/app/auth', authRouter.routes(), authRouter.allowedMethods());

const app = new Application();
app.addEventListener('error', logError);
app.use(resendErrors());
app.use(
  oakCors({
    origin: origin,
  })
);
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });

