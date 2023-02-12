import {
  Button,
  ButtonProps,
  ButtonVariant,
  createPolymorphicComponent,
} from '@mantine/core';
import React, { forwardRef } from 'react';
import {
  NavLinkProps as RRNavLinkProps,
  useHref,
  useLinkClickHandler,
  useMatch,
} from 'react-router-dom';

type PickFromRR =
  | 'target'
  | 'onClick'
  | 'caseSensitive'
  | 'state'
  | 'children'
  | 'end'
  | 'replace'
  | 'reloadDocument';
interface NavLinkProps
  extends Pick<RRNavLinkProps, PickFromRR>,
    Omit<ButtonProps, PickFromRR> {
  to: string;
}

function Link(props: NavLinkProps, ref: React.Ref<HTMLAnchorElement>) {
  const {
    to,
    replace = false,
    state,
    target = '_self',
    onClick,
    children,
    ...rest
  } = props;
  const href = useHref(to);

  const handleClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
  });

  const matchObj = useMatch(to);

  const isMatch = !!matchObj;
  let variant: ButtonVariant = 'subtle';

  if (isMatch) {
    variant = 'filled';
  }

  let childJsx: React.ReactNode = children as React.ReactNode;
  if (children instanceof Function) {
    childJsx = children({ isActive: isMatch });
  }

  return (
    <Button
      component={'a'}
      variant={variant}
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          handleClick(event);
        }
      }}
      ref={ref}
    >
      {childJsx}
    </Button>
  );
}

export default createPolymorphicComponent<'a', NavLinkProps>(forwardRef(Link));
