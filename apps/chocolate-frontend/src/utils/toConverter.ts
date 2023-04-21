import { Fn1 } from './curry1/types';

export interface KeyMap<T> {
  record: Record<string, T | undefined>;
  keys: string[];
}
interface IConverter<A, B> {
  into: Fn1<A, B>;
  intoArray: Fn1<A[], B[]>;
  intoMapArray: <T>(value: T[], map: Fn1<T, A>) => B[];
  intoPages: Fn1<IPagination<A>, IPagination<B>>;
  selectMap: Fn1<B[], Record<string, B | undefined>>;
  intoDict: Fn1<A[], KeyMap<B>>;
  intoDictWithMap: <T>(value: T[], map: Fn1<T, A>) => KeyMap<B>;
}

export interface IPagination<T = unknown> {
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
    intoMapArray: (model, map) => {
      const arr = model.map((value) => {
        const model = map(value);
        return fn(model);
      });

      return arr;
    },
    intoDict: (model) => {
      const reduced = model.reduce(
        (acc, curr) => {
          const converted = converter.into(curr);
          const idValue = converted[idField];
          const id = String(idValue);
          acc.record[id] = converted;
          acc.keys = acc.keys.concat(id);
          return acc;
        },
        { keys: [], record: {} } as KeyMap<B>
      );
      return reduced;
    },
    intoDictWithMap: (model, map) => {
      const asArray = model.map(map);
      return converter.intoDict(asArray);
    },
  };
  return converter;
}
