/* eslint-disable import/no-unresolved */
import { MantineProvider } from '@mantine/core';
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
function AppProvider(props: PropsWithChildren): JSX.Element {
  const { children } = props;
  return (
    <ProviderComposer
      contexts={[
        <QueryClientProvider client={queryClient} />,
        <BrowserRouter />,
        <MantineProvider withCSSVariables>
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
