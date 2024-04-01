import { $clothingStyles, fetchClothingStylesFx } from '@/stores/clothing.store';
import { Checkbox } from 'antd';
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

  const options = useMemo(() => {
    return clothingStyles?.map((style) => t(style.name));
  }, [clothingStyles, t]);

  return (
    <Checkbox.Group
      className="styles-checkboxes"
      options={options}
      value={options}
      onChange={(values) => updateFilters({ styles: values })}
    />
  );
};

export default ChooseStyle;
