/* eslint-disable import/no-unresolved */
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { ProviderComposer } from '../components/ProviderComposer';
import { handleKeyringerr } from '../utils/handleKeyringerr';
import GlobalStyle from './global.styles';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(error) {
        handleKeyringerr(error);
      },
    },
  },
});
const mantineTheme: MantineThemeOverride = {
  primaryColor: 'red',
  primaryShade: 4,
};
function AppProvider(props: PropsWithChildren): JSX.Element {
  const { children } = props;
  return (
    <ProviderComposer
      contexts={[
        <QueryClientProvider client={queryClient} />,
        <BrowserRouter />,
        <MantineProvider withCSSVariables theme={mantineTheme}>
          <></>
        </MantineProvider>,
      ]}
    >
      <GlobalStyle />
      <Toaster position="bottom-right" />
      {children}
    </ProviderComposer>
  );
}

export { AppProvider };
