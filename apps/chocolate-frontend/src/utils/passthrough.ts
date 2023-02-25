/**@file inspired by: https://github.com/GabrielCTroia/promise-passthrough */
type UnaryFn<Arg, Return> = (arg: Arg) => Return;

export function passThroughCatch<T>(fn: UnaryFn<T, unknown>) {
  return (value: T) => {
    fn(value);
    throw value;
  };
}

export function passThroughCatchAwait<T>(fn: UnaryFn<T, Promise<unknown>>) {
  return async (value: T) => {
    await fn(value);
    throw value;
  };
}
