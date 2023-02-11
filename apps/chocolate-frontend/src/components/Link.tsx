import { Button, ButtonVariant } from '@mantine/core';
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
  | 'to'
  | 'caseSensitive'
  | 'state'
  | 'children'
  | 'end'
  | 'replace'
  | 'reloadDocument';
type NavLinkProps = Pick<RRNavLinkProps, PickFromRR>;

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

  const matchObj = useMatch(
    typeof to === 'string' ? to : (to.pathname as string)
  );

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
    <li>
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
    </li>
  );
}
export default forwardRef(Link);
