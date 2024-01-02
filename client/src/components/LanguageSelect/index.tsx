import { LANGUAGES } from '@/lib/constants';
import { Select } from '@/ui';
import { CSSProperties, FC } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelect: FC<{ width?: CSSProperties['width'] }> = ({ width }) => {
  const { i18n } = useTranslation();
  console.log(width);

  return (
    <Select
      defaultValue={i18n.language}
      style={width !== undefined ? { width } : { width: 150 }}
      onChange={(val: string) => i18n.changeLanguage(val)}
      options={LANGUAGES.map((lang) => ({ value: lang.code, label: lang.title }))}
      className="lang-select"
    />
  );
};

export default LanguageSelect;
