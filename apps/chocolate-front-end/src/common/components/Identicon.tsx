import * as IdenticonTypes from 'react-identicon';
import { blake2AsHex } from '@polkadot/util-crypto';

export default function Identicon(
  props: IdenticonTypes.DecoratedReactIdenticonProps
) {
  const { id, type, size, alt, ...otherProps } = props;
  return (
    <img
      alt={alt}
      src={`//www.gravatar.com/avatar/${blake2AsHex(
        id ?? ''
      )}?d=${type}&f=y&s=${size}`}
      {...otherProps}
    />
  );
  
}
