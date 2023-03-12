import { getFromAcct } from '$chocolate-frontend/utils/apiSetup/getFromAcct';
import { setupKeyring } from '$chocolate-frontend/utils/apiSetup/setupKeyring';
import { getW3AuthSignature } from '$chocolate-frontend/utils/ipfs/getW3AuthSignature';
import { pin } from '$chocolate-frontend/utils/ipfs/pin';
import { upload } from '$chocolate-frontend/utils/ipfs/upload';
import { Project } from '@choc-js/schema';

export default setupKeyring(async (ctx, projectInfo: Project) => {
  const { selectedAccount } = ctx;
  const acct = await getFromAcct(selectedAccount);
  const [address, { signer }] = acct;
  const signature = await getW3AuthSignature(address, signer);
  const { cid, ipfs } = await upload(
    signature.AuthBasic,
    JSON.stringify(projectInfo)
  );
  await pin(signature.AuthBearer, cid, ipfs);

  // return { cid: cid.toV1().toString('base32') };
  return cid.toV1().toString();
});
