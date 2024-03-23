import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';
import type { MetaTagsProps } from '@/components/features/MetaTags';

const SEOTags: FC<Omit<MetaTagsProps, 'imagePath'>> = ({ title, description }) => {
  const { i18n } = useTranslation();

  return (
    <Helmet htmlAttributes={{ lang: i18n.language }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={window.location.href} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEOTags;
