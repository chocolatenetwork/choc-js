import { id } from '../identity';
import { Identity } from './types';
export function createAuthIpfsEndpoints(t: Identity) {
  return [
    {
      location: t('Singapore'),
      text: t('DCF'),
      value: 'https://crustipfs.xyz',
    },
    {
      location: t('Seattle'),
      text: t('Crust Network'),
      value: 'https://crustwebsites.net',
    },
    {
      location: t('Berlin'),
      text: t('⚡️ Thunder Gateway'),
      value: 'https://gw.crustapps.net',
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
