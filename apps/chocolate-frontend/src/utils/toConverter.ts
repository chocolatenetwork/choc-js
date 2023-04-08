import { Fn1 } from './curry1/types';

interface IConverter<A, B> {
  into: Fn1<A, B>;
  intoArray: Fn1<A[], B[]>;
  intoPages: Fn1<IPagination<A>, IPagination<B>>;
  selectMap: Fn1<B[], Record<string, B | undefined>>;
}

interface IPagination<T = unknown> {
  results: T[];
  hasMore: boolean;
}

export function toConverter<A, B, IdField extends keyof B>(
  fn: Fn1<A, B>,
  idField: IdField
): IConverter<A, B> {
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
    selectMap: (model) => {
      const reduced = model.reduce((acc, curr) => {
        const idValue = curr[idField];
        const id = String(idValue);
        acc[id] = curr;
        return acc;
      }, {} as Record<string, B | undefined>);
      return reduced;
    },
  };
  return converter;
}
