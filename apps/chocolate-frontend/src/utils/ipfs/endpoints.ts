import { id } from '../identity';
import { Identity } from '../types';
export function createAuthIpfsEndpoints(t: Identity) {
  return [
    {
      location: t<string>('Singapore'),
      text: t<string>('DCF'),
      value: 'https://crustipfs.xyz',
    },
    {
      location: t<string>('Seattle'),
      text: t<string>('Crust Network'),
      value: 'https://gw.crustfiles.app',
    },
    {
      location: t<string>('Berlin'),
      text: t<string>('⚡️ Thunder Gateway'),
      value: 'https://gw.crustfiles.net',
    },
  ];
}
export function getAuthIPFSEndpoints() {
  return createAuthIpfsEndpoints(id)
    .sort(() => (Math.random() > 0.5 ? -1 : 1))
    .map((item) => ({
      ...item,
      text: `${item.text ?? ''}(${item.location ?? ''})`,
    }));
}
export function getPinEndpoints() {
  return [
    {
      text: 'Crust Pinner',
      value: 'https://pin.crustcode.com/psa',
    },
  ];
}
export const defaultPinE = getPinEndpoints()[0];
export const defaultAuthE = getAuthIPFSEndpoints()[0];
