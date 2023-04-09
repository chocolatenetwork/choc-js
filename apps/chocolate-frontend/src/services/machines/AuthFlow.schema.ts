import { IUserDb } from '$chocolate-frontend/models/User';

export enum ErrorReasons {
  notVerified = 'notVerified',
  notConnected = 'notConnected',
}
export type AuthFlowEvents =
  | {
      type: 'Success';
      user: IUserDb;
    }
  | {
      type: 'Error';
      reason: ErrorReasons;
    }
  | {
      type: 'connected';
    };
export interface AuthFlowContext {
  errorReason?: ErrorReasons;
  user?: IUserDb;
}
