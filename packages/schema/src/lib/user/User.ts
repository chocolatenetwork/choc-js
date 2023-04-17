
export interface User {
  'User Id': string;
  Points: number;
  'Account Type': AccountType;
}

export enum AccountType {
  Project = 'project',
  User = 'user',
}
export enum UserRole {
  admin = 'admin',
  normal = 'normal',
}