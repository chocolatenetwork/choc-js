export function getAverage(sum: number, count: number) {
  const value = sum / count;
  if (Number.isNaN(value)) return 0;
  return value;
}
