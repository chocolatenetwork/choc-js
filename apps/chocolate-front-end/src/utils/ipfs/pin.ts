import { getPinEndpoints } from './endpoints';

const defaultPinE = getPinEndpoints()[0];

async function pin(BearerAuth: string,
    cid: string,
    name: string,
    pinEndpoint = defaultPinE) {
    if (cid.length !== 46) {
        throw new Error('CID len err');
    }

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
