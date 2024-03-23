import type { FC } from 'react';
import SEOTags from './SEOTags';
import OpenGraph from './OpenGraph';

export type MetaTagsProps = {
  title: string;
  description: string;
  imagePath?: string;
};

const MetaTags: FC<MetaTagsProps> = ({ title, description, imagePath }) => {
  return (
    <>
      <SEOTags title={title} description={description} />
      <OpenGraph title={title} description={description} imagePath={imagePath ?? '/opengraph/og-image-main.webp'} />
    </>
  );
};

export default MetaTags;
