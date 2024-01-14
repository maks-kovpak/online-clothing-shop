import { Helmet } from 'react-helmet-async';
import type { FC } from 'react';
import type { MetaTagsProps } from '@/components/MetaTags';

const SearchEngineOptimization: FC<Omit<MetaTagsProps, 'imagePath'>> = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={import.meta.env.VITE_URL_ORIGIN} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SearchEngineOptimization;
