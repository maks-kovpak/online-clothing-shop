import { useMemo } from 'react';
import type { FormRule } from 'antd';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import UserApi from '@/lib/api/user';
import { PASSWORD_PATTERN, USERNAME_PATTERN } from '@/lib/constants/regex';
import $user from '@/stores/user.store';

/**
 * The `useValidationRules` hook provides validation rules for form fields like
 * password confirmation, email existence check, and basic field validations.
 * @returns An object with three properties: `rules`, `checkIfEmailExists`, and `confirmPassword`.
 */
const useValidationRules = () => {
  const { t } = useTranslation();
  const user = useUnit($user);

  const confirmPassword: FormRule = useMemo(
    () =>
      ({ getFieldValue }) => ({
        validator: (_, value) => {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }

          return Promise.reject(new Error(t('PASSWORDS_DO_NOT_MATCH')));
        },
      }),
    [t]
  );

  const checkIfEmailExists: FormRule = useMemo(
    () => () => ({
      validator: async (_, value) => {
        const response = await UserApi.exists('email', value);

        if (!value || !response.data.exists) {
          return Promise.resolve();
        }

        return Promise.reject(new Error(t('EMAIL_ALREADY_EXISTS')));
      },
    }),
    [t]
  );

  const checkIfUsernameExists: FormRule = useMemo(
    () =>
      ({ isFieldTouched }) => ({
        validator: async (_, value) => {
          if (!isFieldTouched('username') || value === user?.username) {
            return Promise.resolve();
          }

          const response = await UserApi.exists('username', value);

          if (!value || !response.data.exists) {
            return Promise.resolve();
          }

          return Promise.reject(new Error(t('USERNAME_ALREADY_EXISTS')));
        },
      }),
    [t, user]
  );

  const rules: Record<'requiredField' | 'email' | 'password' | 'username', FormRule[]> = useMemo(
    () => ({
      requiredField: [{ required: true, message: t('FIELD_REQUIRED') }],
      email: [
        { type: 'email', message: t('EMAIL_NOT_VALID') },
        { required: true, message: t('FIELD_REQUIRED') },
      ],
      password: [
        { pattern: PASSWORD_PATTERN, message: t('PASSWORD_NOT_VALID') },
        { required: true, message: t('FIELD_REQUIRED') },
      ],
      username: [
        { pattern: USERNAME_PATTERN, message: t('USERNAME_NOT_VALID') },
        { required: true, message: t('FIELD_REQUIRED') },
        checkIfUsernameExists,
      ],
    }),
    [checkIfUsernameExists, t]
  );

  return { rules, checkIfEmailExists, confirmPassword };
};

export default useValidationRules;
