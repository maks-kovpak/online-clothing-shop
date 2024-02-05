import casualImage from '@/assets/img/main/dress-style/image1.png';
import formalImage from '@/assets/img/main/dress-style/image2.png';
import partyImage from '@/assets/img/main/dress-style/image3.png';
import gymImage from '@/assets/img/main/dress-style/image4.png';

import './index.scss';
import { useTranslation } from 'react-i18next';

const cards = [
  {
    title: 'CASUAL',
    image: casualImage,
  },
  {
    title: 'FORMAL',
    image: formalImage,
  },
  {
    title: 'PARTY',
    image: partyImage,
  },
  {
    title: 'GYM',
    image: gymImage,
  },
];

const DressStyleSection = () => {
  const { t } = useTranslation();
  return (
    <section className="primary-section">
      <div className="dress-style">
        <h2>{t('BROWSE_BY_DRESS_STYLE').toUpperCase()}</h2>

        <div className="cards-container">
          {cards.map((card) => (
            <a className="dress-style-card" href="" key={card.title}>
              <h3>{t(card.title)}</h3>
              <img src={card.image} alt={card.title} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DressStyleSection;
