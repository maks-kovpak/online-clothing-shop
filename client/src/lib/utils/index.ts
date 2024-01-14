/**
 * The `px` function takes a number or string value and returns it as a string with "px" appended.
 * @param value - The number of pixels.
 * @returns a string in the format `px`, where `number` is the parsed integer value of the input `value`.
 */
export const px = (value: number | string): `${number}px` => {
  return `${parseInt(value.toString())}px`;
};
