import UserVerification, {
  IUserVerificationDbApi,
} from '$chocolate-frontend/models/UserVerification';
import { functionsApi } from '$chocolate-frontend/services/api/api';
import { AccountType } from '@choc-js/schema';

interface IRequest {
  accountType: AccountType;
  name: string;
  twitter: string;
  picture?: string;
  description?: string;
  address: string;
  signature: string;
}

export async function postInitiateVerification(body: IRequest) {
  const { data } = await functionsApi.post<IUserVerificationDbApi>(
    '/app/auth/verify',
    {
      body,
    }
  );

  return UserVerification.into(data);
}
