import type { FormInstance } from 'antd';

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
