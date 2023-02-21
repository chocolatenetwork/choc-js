import { Any, ExtractRest, Fn1 } from './types';

// ...Fns

export function curry1<
  Arg0,
  _Fn extends Fn1<Arg0, Any>,
  Rest extends ExtractRest<_Fn>
>(fn: _Fn, arg0: () => Arg0): (...args: Rest) => ReturnType<_Fn> {
  return (...args: Rest): ReturnType<_Fn> => {
    return fn(arg0(), ...args) as ReturnType<_Fn>;
  };
}
