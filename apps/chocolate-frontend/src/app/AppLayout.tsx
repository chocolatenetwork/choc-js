import { AppShell, createStyles } from '@mantine/core';
import React from 'react';
// import '../services/api/api';
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
  // const [state] = useActor(apiService);

  return (
    <AppShell classNames={classes} padding={0} header={<MenuBar />}>
      {/* {state.matches('Connected') && children}
      {state.matches('Loading') && 'Loading...'}
      {state.matches('Disconnected') && 'Api Error'} */}
      {children}
    </AppShell>
  );
}
