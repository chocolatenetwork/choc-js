import { httpErrors, Middleware } from 'oak';
import { validate, ValidationErrors, ValidationRules } from 'validasaur';
// } from '';

/**
 * get single error message from errors
 */
const getErrorMessage = (errors: ValidationErrors): string | undefined => {
  for (const attr in errors) {
    const attrErrors = errors[attr];
    for (const rule in attrErrors) {
      return attrErrors[rule] as string;
    }
  }
};

interface IRequestValidator {
  bodyRules: ValidationRules;
}
/**
 * request validation middleware
 * validate request body with given validation rules
 */
function requestValidator({ bodyRules }: IRequestValidator): Middleware {
  return async (ctx, next) => {
    /** get request body */
    const request = ctx.request;
    const body = await request.body().value;

    /** check rules */
    const [isValid, errors] = await validate(body, bodyRules);
    if (!isValid) {
      /** if error found, throw bad request error */
      const message = getErrorMessage(errors);
      const string = JSON.stringify({ message });
      throw new httpErrors.BadRequest(string);
    }

    await next();
  };
}

export { requestValidator };
