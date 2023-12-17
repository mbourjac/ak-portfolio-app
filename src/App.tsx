import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout/AppLayout';
import { HomePage } from './pages/HomePage/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage/ProjectDetailPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path=":slug" element={<ProjectDetailPage />} />
    </Route>,
  ),
);

export const App = () => {
  return <RouterProvider router={router} />;
};
