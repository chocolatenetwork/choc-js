import { AppLayout } from './AppLayout';
import { AppProvider } from './AppProvider';
import { AppRoutes } from './AppRoutes';

export function App() {
  return (
    <AppProvider>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </AppProvider>
  );
}

export default App;
