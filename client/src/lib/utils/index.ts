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
 * Check whether a form is valid by verifying if any fields have been touched
 * and if there are any errors in the form fields.
 *
 * @param form - The AntDesign form instance.
 * @returns A boolean value that represent whether the form is valid or not.
 */
export const isFormValid = (form: FormInstance) => {
  return !form.isFieldsTouched(true) || Boolean(form.getFieldsError().filter(({ errors }) => errors.length).length);
};

/**
 * The `resolve` function takes a base URL and a relative path, and returns the resolved absolute URL.
 *
 * @param url - The base URL to resolve the path against.
 * @param path - The path that you want to resolve against the base URL.
 * @returns The resolved URL as a string.
 */
export const resolve = (url: string | URL, path: string | URL) => {
  return new URL(path, url).href;
};
