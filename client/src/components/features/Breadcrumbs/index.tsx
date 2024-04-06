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
    const items = [];

    for (const match of matches) {
      const crumb = match.handle?.crumb;
      if (!crumb) continue;

      const value = typeof crumb === 'string' ? crumb : crumb(match, t);
      if (!value) continue;

      items.push({ title: t(value), href: match.pathname });
    }

    return items;
  }, [matches, t]);

  return <Breadcrumb items={crumbs} separator={<ArrowDownIcon />} />;
};

export default Breadcrumbs;
