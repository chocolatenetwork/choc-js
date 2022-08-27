import { getPinEndpoints } from './endpoints';

const defaultPinE = getPinEndpoints()[0];

export async function pin(BearerAuth: string,
    cid: string,
    name: string,
    pinEndpoint = defaultPinE) {

    const { body } = await fetch(pinEndpoint + '/pins', {
      headers: {
        authorization: BearerAuth,
      },
      method: 'POST',
      body: JSON.stringify({
        cid,
        name,
      }),
    });
    return body;
}
