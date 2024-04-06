import { Breadcrumb } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router-dom';
import type { UIMatch } from 'react-router-dom';
import type { RouteHandlerType } from '@/lib/types';

import ArrowDownIcon from '@/assets/icons/breadcrumbs-arrow.svg?react';
import './index.scss';

const Breadcrumbs = () => {
  const matches = useMatches() as UIMatch<unknown, RouteHandlerType>[];
  const { t } = useTranslation();

  const crumbs = useMemo(() => {
    return matches
      .filter((match) => match.handle?.crumb)
      .map((match) => {
        const crumb = match.handle!.crumb;

        return {
          title: t(typeof crumb === 'string' ? crumb : crumb(match.data, match.params, t)),
          href: match.pathname,
        };
      });
  }, [matches, t]);

  return <Breadcrumb items={crumbs} separator={<ArrowDownIcon />} />;
};

export default Breadcrumbs;
