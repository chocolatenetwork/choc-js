import { Loading } from './BrownLoadingSpinner';
import { chocolateLogo } from './constants';

export const loader = (text: string, greet = false): JSX.Element => (
  <Loading message={text} img={chocolateLogo} {...{ greet }} />
);
