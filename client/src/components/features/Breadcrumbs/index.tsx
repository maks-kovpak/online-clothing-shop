import { Breadcrumb } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { UIMatch, useMatches } from 'react-router-dom';

const Breadcrumbs = () => {
  const matches = useMatches() as UIMatch<unknown, { crumb: string } | undefined>[];
  const { t } = useTranslation();

  const crumbs = useMemo(() => {
    return matches
      .filter((match) => match.handle?.crumb)
      .map((match) => ({ title: t(match.handle!.crumb), href: match.pathname }));
  }, [matches, t]);

  return <Breadcrumb items={crumbs} />;
};

export default Breadcrumbs;
