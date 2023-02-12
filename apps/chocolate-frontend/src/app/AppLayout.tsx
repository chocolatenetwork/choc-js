import { AppShell, createStyles } from '@mantine/core';
import React from 'react';
import MenuBar from './MenuBar';

const useAppStyles = createStyles((theme) => {
  return {
    main: {
      backgroundColor: theme.colors.gray[0],
    },
    root: {
      '--header-border': theme.colors.gray[5],
    },
  };
});

export function AppLayout({ children }: React.PropsWithChildren): JSX.Element {
  const { classes } = useAppStyles();
  return (
    <AppShell classNames={classes} padding={0} header={<MenuBar />}>
      {children}
    </AppShell>
  );
}
