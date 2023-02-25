import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { AppError } from '../../utils/AppError';
import { AccountType, InjectedAccountWithMeta } from './types';

const APP = 'Chocolate App';
// Load all, so we can ask user to select one and use
export async function enableAndLoadAll(): Promise<InjectedAccountWithMeta[]> {
  await enable();

  const accounts = await loadAccounts();
  return accounts;
}
async function loadAccounts() {
  // we are now informed that the user has at least one extension and that we
  // will be able to show and use accounts
  // returns an array of { address, meta: { name, source } }
  // meta.source contains the name of the extension that provides this account
  const allAccounts = await web3Accounts({
    accountType: ['sr25519'] as [AccountType],
  });

  if (allAccounts.length === 0) {
    // no extension installed, or the user did not accept the authorization
    // in this case we should inform the use and give a link to the extension
    throw new AppError('404.Accounts');
  }
  const cleanedAccounts: InjectedAccountWithMeta[] = allAccounts.map(
    (account) => {
      return {
        address: account.address,
        meta: {
          name: account.meta.name ?? account.address,
          source: account.meta.source,
        },
        type: account.type as AccountType,
      };
    }
  );
  return cleanedAccounts;
}

async function enable() {
  // returns an array of all the injected sources
  // (this needs to be called first, before other requests)
  // this call fires up the authorization popup
  const extensions = await web3Enable(APP);

  if (extensions.length === 0) {
    // no extension installed, or the user did not accept the authorization
    // in this case we should inform the use and give a link to the extension
    throw new AppError('404.Extensions');
  }
}

