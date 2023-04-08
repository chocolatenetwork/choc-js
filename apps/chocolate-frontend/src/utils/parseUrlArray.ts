export function parseUrlArray(modals: string | null) {
  if (!modals) return [];
  const array = modals.split(',');
  return array;
}
