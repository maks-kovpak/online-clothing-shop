import { useState } from 'react';
import { Tag } from '@/ui';
import { ClothingSize } from '@server/lib/enums';
import './index.scss';

const tagsData = Object.values(ClothingSize);

const ChooseSize = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([tagsData[0]]);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
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
