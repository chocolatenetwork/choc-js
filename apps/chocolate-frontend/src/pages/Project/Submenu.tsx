import { Tabs } from '@mantine/core';
import { TabOptions } from './ProjectBody/ProjectBody.utils';

export function Submenu() {
  return (
    <Tabs.List position="center">
      <Tabs.Tab value={TabOptions.reviews}>Reviews</Tabs.Tab>
      <Tabs.Tab value={TabOptions.about}>About</Tabs.Tab>
    </Tabs.List>
  );
}
