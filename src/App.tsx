import { HelmetProvider } from 'react-helmet-async';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AppLayout } from './layouts/AppLayout/AppLayout';
import { appLayoutLoader } from './layouts/AppLayout/AppLayout.loader';
import { queryClient } from './lib/react-query';
import { HomePage } from './pages/HomePage/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage/ProjectDetailPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<AppLayout />}
      loader={appLayoutLoader(queryClient)}
    >
      <Route index element={<HomePage />} />
      <Route path=":slug" element={<ProjectDetailPage />} />
    </Route>,
  ),
);

export const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  );
};
