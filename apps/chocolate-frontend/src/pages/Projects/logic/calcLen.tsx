export function calcLen(width: number) {
  const padding = 72;
  const colGap = 80;
  const leftWidth = Math.max(width - padding * 2, 0);
  const itemWidth = 400;
  return Math.round(leftWidth / (itemWidth + colGap));
}
