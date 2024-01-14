import { Helmet } from 'react-helmet-async';
import type { AppSeo, PageSeo } from '../content/utils/seo/seo.types';

type SeoProps = {
  appSeo?: AppSeo;
  pageSeo?: PageSeo;
};

export const Seo = ({ appSeo, pageSeo }: SeoProps) => {
  const title = pageSeo?.title ?? appSeo?.title;
  const description = pageSeo?.description ?? appSeo?.description;
  const ogImageUrl = pageSeo?.ogImageUrl ?? appSeo?.ogImageUrl;

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}

      {title && <meta property="og:title" content={title}></meta>}
      {description && (
        <meta property="og:description" content={description}></meta>
      )}
      {ogImageUrl && <meta property="og:image" content={ogImageUrl}></meta>}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.origin}></meta>
    </Helmet>
  );
};
