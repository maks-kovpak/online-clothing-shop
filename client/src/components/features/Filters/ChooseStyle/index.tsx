import { $clothingStyles, fetchClothingStylesFx } from '@/stores/clothing.store';
import { Checkbox } from 'antd';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './index.scss';

const ChooseStyle = () => {
  const { t } = useTranslation();
  const [clothingStyles, fetchClothingStyles] = useUnit([$clothingStyles, fetchClothingStylesFx]);

  useEffect(() => {
    fetchClothingStyles();
  }, [fetchClothingStyles]);

  return <Checkbox.Group className="styles-checkboxes" options={clothingStyles.map((style) => t(style.name))} />;
};

export default ChooseStyle;
