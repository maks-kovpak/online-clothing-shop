import { $clothingStyles, fetchClothingStylesFx } from '@/stores/clothing.store';
import { Checkbox, CheckboxOptionType } from 'antd';
import { useUnit } from 'effector-react';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { updateFiltersEvent } from '@/stores/filters.store';

import './index.scss';

const ChooseStyle = () => {
  const { t } = useTranslation();
  const [clothingStyles, fetchClothingStyles] = useUnit([$clothingStyles, fetchClothingStylesFx]);

  const updateFilters = useUnit(updateFiltersEvent);

  useEffect(() => {
    fetchClothingStyles();
  }, [fetchClothingStyles]);

  const options: CheckboxOptionType[] = useMemo(() => {
    return clothingStyles?.map((style) => ({
      value: style.name,
      label: t(style.name),
    }));
  }, [clothingStyles, t]);

  return (
    <Checkbox.Group
      className="styles-checkboxes"
      options={options}
      onChange={(values) => updateFilters({ styles: values as string[] })}
    />
  );
};

export default ChooseStyle;
