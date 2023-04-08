import { Fn1 } from './curry1/types';

interface IConverter<A, B> {
  into: Fn1<A, B>;
  intoArray: Fn1<A[], B[]>;
  intoPages: Fn1<IPagination<A>, IPagination<B>>;
}

interface IPagination<T = unknown> {
  results: T[];
  hasMore: boolean;
}

export function toConverter<A, B>(fn: Fn1<A, B>): IConverter<A, B> {
  const converter: IConverter<A, B> = {
    into: fn,
    intoArray: (model) => model.map(fn),
    intoPages: (model) => {
      const { results, ...rest } = model;
      return {
        ...rest,
        results: converter.intoArray(results),
      };
    },
  };
  return converter;
}
