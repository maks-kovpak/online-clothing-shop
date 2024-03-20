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
