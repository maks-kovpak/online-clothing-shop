import type { Aggregate } from 'mongoose';
import type { FiltersQueryParams } from './types/models.js';

/**
 * The function attempts to parse a string value as JSON and
 * returns the parsed value or the original string if parsing fails.
 *
 * @param value - A string value to be parsed.
 * @returns The parsed JSON value if parsing is successful,
 * otherwise it returns the original string value.
 */
export const getQueryParamValue = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

/**
 * The function takes in query parameters and an aggregation object,
 * and applies filtering based on the query parameters.
 *
 * @param query - An object that contains the filters to be applied to the aggregation.
 * @param aggregation - An instance of Mongoose aggregation object.
 * @returns An aggregation with applied filters.
 */
export const filterByQuery = <T extends object>(query: FiltersQueryParams<T>, aggregation: Aggregate<T[]>) => {
  for (const [key, value] of Object.entries(query)) {
    switch (key) {
      case 'limit': {
        const limit = parseInt(value as string);

        if (!Number.isNaN(limit)) {
          aggregation = aggregation.limit(limit);
        }

        break;
      }

      case 'sortBy': {
        const { sortOrder } = query;
        aggregation = aggregation.sort(sortOrder ? { [value]: sortOrder } : (value as string));
        break;
      }

      case 'sortOrder': {
        break; // Only makes sense if the `sortBy` parameter is present
      }

      default: {
        const parsedValue = getQueryParamValue(value as string);
        aggregation = aggregation.match({ [key]: parsedValue });
      }
    }
  }

  return aggregation;
};
