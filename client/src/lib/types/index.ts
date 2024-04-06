import type { TFunction } from 'i18next';
import type { UIMatch } from 'react-router-dom';

export type BreadcrumbFunc = (
  match: UIMatch<unknown, RouteHandlerType>,
  t: TFunction<'translation', undefined>
) => string;

export type RouteHandlerType = { crumb: BreadcrumbFunc | string } | undefined;
