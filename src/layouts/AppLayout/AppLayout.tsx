import { Outlet, useLoaderData } from 'react-router-dom';
import { Seo } from '../../components/Seo';
import { useSettingsQuery } from '../../content/settings/settings.queries';
import type { Settings } from '../../content/settings/settings.types';

export const AppLayout = () => {
  const initialData = useLoaderData() as Settings;
  const { seo } = useSettingsQuery(initialData);

  return (
    <>
      <Seo appSeo={seo} />
      <Outlet />
    </>
  );
};
