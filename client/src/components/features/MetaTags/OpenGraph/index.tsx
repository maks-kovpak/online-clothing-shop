import { Helmet } from 'react-helmet-async';
import { LANGUAGES } from '@/lib/constants';
import type { FC } from 'react';
import type { MetaTagsProps } from '@/components/features/MetaTags';

const OpenGraph: FC<MetaTagsProps> = ({ title, description, imagePath }) => {
  return (
    <Helmet>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Shop.co" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:image" content={imagePath} />
      <meta property="og:image:secure_url" content={new URL(imagePath, window.location.href).href} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {LANGUAGES.map((lang) => (
        <meta
          property={lang.isMain ? 'og:locale' : 'og:locale:alternate'}
          content={lang.code + '_' + lang.region}
          key={lang.code + '_' + lang.region}
        />
      ))}
    </Helmet>
  );
};

export default OpenGraph;
