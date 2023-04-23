export function cleanUserPic(address: string, picture?: string) {
  if (!picture) {
    return `https://api.dicebear.com/6.x/identicon/svg?seed=${address}`;
  }
  return picture;
}
