import { toConverter } from '$chocolate-frontend/utils/toConverter';

export interface IUserVerificationDb {
  id: string;
  address: string;
  signature: string;

  // user info
  picture: string | null;
  description: string | null;
  name: string;
  twitter: string;

  // timestamps
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserVerificationDbApi {
  id: string;
  address: string;
  signature: string;

  // user info
  picture: string | null;
  description: string | null;
  name: string;
  twitter: string;

  // timestamps
  createdAt: string;
  updatedAt: string;
}

function intoUserVerification(
  api: IUserVerificationDbApi
): IUserVerificationDb {
  return {
    ...api,
    createdAt: new Date(api.createdAt),
    updatedAt: new Date(api.updatedAt),
  };
}

export default toConverter(intoUserVerification, 'id');
