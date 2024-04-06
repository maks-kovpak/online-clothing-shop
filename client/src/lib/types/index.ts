import type { TFunction } from 'i18next';
import type { Params } from 'react-router-dom';

export type BreadcrumbFunc =
  | ((data: unknown, params: Params<string>, t: TFunction<'translation', undefined>) => string)
  | string;

export type RouteHandlerType = { crumb: BreadcrumbFunc } | undefined;
