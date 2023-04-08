import { parseUrlArray } from './parseUrlArray';

export function makeModalFns(
  modalString: string | null,
  search: URLSearchParams,
  setSearchParams: (search: URLSearchParams) => void,
  modalKey: string
) {
  const openModal = (key: string) => {
    const modals = parseUrlArray(modalString);
    if (modals.includes(key)) return;
    modals.push(key);
    const modalValue = modals.join();
    const newParams = new URLSearchParams(search);
    newParams.set(modalKey, modalValue);
    setSearchParams(newParams);
  };
  const closeModal = (key: string) => {
    const modals = parseUrlArray(modalString);
    if (!modals.includes(key)) return;
    const filtered = modals.filter((value) => value !== key);
    if (filtered.length === 0) {
      const newParams = new URLSearchParams(search);
      newParams.delete(modalKey);
      setSearchParams(newParams);
    } else {
      const modalValue = filtered.join();
      const newParams = new URLSearchParams(search);
      newParams.set(modalKey, modalValue);
      setSearchParams(newParams);
    }
  };
  return { openModal, closeModal };
}
