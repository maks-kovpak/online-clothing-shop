import type { FormInstance } from 'antd';
import Color from 'color';
import { minBy } from 'lodash';

/**
 * The `px` function takes a number or string value and returns it as a string with "px" appended.
 * @param value - The number of pixels.
 * @returns A string in the format `${number}px`, where `number` is the parsed integer value of the input `value`.
 */
export const px = (value: number | string): `${number}px` => {
  return `${parseInt(value.toString())}px`;
};

/**
 * Check whether a form is not valid by verifying if any fields have been touched
 * and if there are any errors in the form fields.
 *
 * @param form - The AntDesign form instance.
 * @param [invalidIfNotTouched = true] - A boolean flag that determines whether the form
 * should be considered invalid if any of its fields have not been touched.
 * @returns A boolean value that represent whether the form is valid or not.
 */
export const formNotValid = (form: FormInstance, invalidIfNotTouched: boolean = true) => {
  return (
    (invalidIfNotTouched && !form.isFieldsTouched(true)) ||
    Boolean(form.getFieldsError().filter(({ errors }) => errors.length).length)
  );
};

/**
 * The function calculates the color difference between two colors using Delta E (CIE76).
 *
 * @param firstColor - The first color for which you want to calculate the color difference.
 * @param secondColor - The second color for which you want to calculate the color difference.
 * @returns The distance between two colors between 0 and 100. If the value is
 * - <= 1.0: Not perceptible by the human eye;
 * - 1-2: Perceptible through close observation;
 * - 2-10: Perceptible at a glance;
 * - 11-49: Colors are more similar than the opposite;
 * - 50-100: Colors are exactly the opposite.
 */
export const colorDifference = (firstColor: Color, secondColor: Color) => {
  const firstLAB = firstColor.lab();
  const secondLAB = secondColor.lab();

  const diffL = firstLAB.l() - secondLAB.l();
  const diffA = firstLAB.a() - secondLAB.a();
  const diffB = firstLAB.b() - secondLAB.b();

  return Math.sqrt(diffL * diffL + diffA * diffA + diffB * diffB);
};

/**
 * The function takes a reference color and a set of colors, calculates the color
 * differences, and returns the closest color from the set based on the differences.
 *
 * @param referenceColor - A string representing the color
 * for which you want to find the closest color in the `setOfColors` array.
 * @param setOfColors - An array containing different colors.
 * @returns The color from the `setOfColors` array that is closest to the `referenceColor`.
 */
export const findClosestColor = (referenceColor: string, setOfColors: string[]) => {
  const colorsDifferences = setOfColors.map((color) => {
    return { color, diff: colorDifference(new Color(referenceColor), new Color(color)) };
  });

  return minBy(colorsDifferences, 'diff')!.color;
};
