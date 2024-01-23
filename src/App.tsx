import { HelmetProvider } from 'react-helmet-async';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ContainerContextProvider } from './container/ContainerContextProvider';
import { AppLayout } from './layouts/AppLayout/AppLayout';
import { appLayoutLoader } from './layouts/AppLayout/AppLayout.loader';
import { queryClient } from './lib/react-query';
import { Home } from './pages/Home/Home';
import { homeLoader } from './pages/Home/Home.loader';
import { ProjectDetailPage } from './pages/ProjectDetailPage/ProjectDetailPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<AppLayout />}
      loader={appLayoutLoader(queryClient)}
    >
      <Route index element={<Home />} loader={homeLoader(queryClient)} />
      <Route path=":slug" element={<ProjectDetailPage />} />
    </Route>,
  ),
);

export const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ContainerContextProvider>
          <RouterProvider router={router} />
        </ContainerContextProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};
