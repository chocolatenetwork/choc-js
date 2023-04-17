export function toMessage(msg: string) {
  return JSON.stringify({ message: msg });
}


export enum PostgresErrors {
  UNIQUE_CONSTRAINT = '23505',
}