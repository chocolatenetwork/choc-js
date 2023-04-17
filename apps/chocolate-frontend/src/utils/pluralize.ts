const pluralRules = new Intl.PluralRules('en-US');

export function pluralize(count: number, singular: string, plural: string) {
  const grammaticalNumber = pluralRules.select(count);

  switch (grammaticalNumber) {
    case 'one':
      return count + ' ' + singular;
    default:
      return count + ' ' + plural;
  }
}
