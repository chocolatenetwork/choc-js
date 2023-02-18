// Types...
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;
export type Fn<Args, Return> = (...args: Args[]) => Return;
export type Fn1<Arg0, Return> = (arg0: Arg0, ...args: Any[]) => Return;
export type ExtractRest<_Fn extends Fn<Any, Any>> = _Fn extends (
  a0: Any,
  ...args: infer T
) => Any
  ? T
  : Any;
