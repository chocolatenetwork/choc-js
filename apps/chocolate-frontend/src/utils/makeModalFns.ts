import { URLSearchParamsInit } from 'react-router-dom';
import { Any } from './curry1/types';
import { parseUrlArray } from './parseUrlArray';

type UseSearchParamsReturn = readonly [
  URLSearchParams,
  (
    nextInit: URLSearchParamsInit,
    navigateOptions?:
      | {
          replace?: boolean | undefined;
          state?: Any;
        }
      | undefined
  ) => void
];
export function makeModalFns(
  modalString: string | null,
  search: UseSearchParamsReturn[0],
  setSearchParams: UseSearchParamsReturn[1],
  modalKey: string
) {
  const openModal = (key: string) => {
    const modals = parseUrlArray(modalString);
    if (modals.includes(key)) return;
    modals.push(key);
    const modalValue = modals.join();
    const newParams = new URLSearchParams(search);
    newParams.set(modalKey, modalValue);
    setSearchParams(newParams, { replace: true });
  };
  const closeModal = (key: string) => {
    const modals = parseUrlArray(modalString);
    if (!modals.includes(key)) return;
    const filtered = modals.filter((value) => value !== key);
    if (filtered.length === 0) {
      const newParams = new URLSearchParams(search);
      newParams.delete(modalKey);
      setSearchParams(newParams, { replace: true });
    } else {
      const modalValue = filtered.join();
      const newParams = new URLSearchParams(search);
      newParams.set(modalKey, modalValue);
      setSearchParams(newParams, { replace: true });
    }
  };
  return { openModal, closeModal };
}
