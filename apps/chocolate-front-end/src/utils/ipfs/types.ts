export interface AuthIpfsEndpoint {
  text?: string;
  value: string;
  location?: string;
}

export type Identity= <T>(t:T) => T