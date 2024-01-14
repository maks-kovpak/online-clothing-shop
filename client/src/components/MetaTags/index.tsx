import type { FC } from 'react';
import SearchEngineOptimization from './SearchEngineOptimization';
import OpenGraph from './OpenGraph';

export type MetaTagsProps = {
  title: string;
  description: string;
  imagePath: string;
};

const MetaTags: FC<MetaTagsProps> = ({ title, description, imagePath }) => {
  return (
    <>
      <SearchEngineOptimization title={title} description={description} />
      <OpenGraph title={title} description={description} imagePath={imagePath} />
    </>
  );
};

export default MetaTags;
