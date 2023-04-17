import { ApplicationErrorEvent } from 'https://deno.land/x/oak@v11.1.0/application.ts';
import { Application, State } from 'oak';

export function logError(
  err: ApplicationErrorEvent<State, Application['state']>
) {
  const { error } = err;
  if (error.cause !== undefined) {
    console.error('[Error Cause]', JSON.stringify(error.cause));
  }
}
