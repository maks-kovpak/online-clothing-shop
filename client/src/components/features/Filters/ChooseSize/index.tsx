import { useState } from 'react';
import { Tag } from '@/ui';
import { ClothingSize } from '@server/lib/enums';
import { useUnit } from 'effector-react';
import { updateFiltersEvent } from '@/stores/filters.store';

import './index.scss';

const tagsData = Object.values(ClothingSize);

const ChooseSize = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const updateFilters = useUnit(updateFiltersEvent);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    updateFilters({ sizes: nextSelectedTags });
  };

  return (
    <div className="choose-size">
      {tagsData.map((tag) => (
        <Tag.CheckableTag
          key={tag}
          checked={selectedTags.includes(tag)}
          onChange={(checked) => handleChange(tag, checked)}
        >
          {tag}
        </Tag.CheckableTag>
      ))}
    </div>
  );
};

export default ChooseSize;
