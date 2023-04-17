export function calcLen(
  width: number,
  paddingX = 72,
  colGap = 80,
  itemWidth = 400
) {
  const leftWidth = Math.max(width - paddingX * 2, 0);
  return Math.floor(leftWidth / (itemWidth + colGap));
}
