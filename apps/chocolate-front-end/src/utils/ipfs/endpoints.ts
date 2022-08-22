import { createAuthIpfsEndpoints } from '@polkadot/apps-config';
import { id } from '../identity';

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
