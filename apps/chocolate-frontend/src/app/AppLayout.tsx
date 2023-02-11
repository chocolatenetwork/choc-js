/* eslint-disable import/no-unresolved */
import { AppShell } from '@mantine/core';
import React from 'react';
import MenuBar from './MenuBar';

/* NB: AppLayout==AppShell, so do  all box styling here */
export function AppLayout({ children }: React.PropsWithChildren): JSX.Element {
  return <AppShell header={<MenuBar />}>{children}</AppShell>;
}
