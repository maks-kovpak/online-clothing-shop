import { Flex, Divider } from 'antd';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TwitterIcon from '@/assets/icons/twitter.svg?react';
import FacebookIcon from '@/assets/icons/facebook.svg?react';
import InstagramIcon from '@/assets/icons/instagram.svg?react';
import GitHubIcon from '@/assets/icons/github.svg?react';
import logo from '@/assets/img/logo.svg';

import './index.scss';

type FooterConfig = Array<{
  category: string;
  items: Array<{ title: string; link: string }>;
}>;

const PageFooter = () => {
  const { t } = useTranslation();
  const footerConfig: FooterConfig = useMemo(
    () => [
      {
        category: 'COMPANY',
        items: [
          { title: 'ABOUT', link: '' },
          { title: 'FEATURES', link: '' },
          { title: 'WORKS', link: '' },
          { title: 'CAREER', link: '' },
        ],
      },
      {
        category: 'HELP',
        items: [
          { title: 'CUSTOMER_SUPORT', link: '' },
          { title: 'DELIVERY_DETAILS', link: '' },
          { title: 'TERMS_AND_CONDITIONS', link: '' },
          { title: 'PRIVACY_POLICY', link: '' },
        ],
      },
      {
        category: 'FAQ',
        items: [
          { title: 'ACCOUNT', link: '' },
          { title: 'MANAGE_DELIVERIES', link: '' },
          { title: 'ORDERS', link: '' },
          { title: 'PAYMENT', link: '' },
        ],
      },
    ],
    []
  );
  return (
    <footer>
      <div className="footer-inner">
        <Flex justify="space-between" gap={120}>
          <Flex className="main-footer-info" justify="space-between" vertical>
            <div>
              <img src={logo} alt="SHOP.CO" />
              <p>{t('FOOTER_DESCRIPTION')}</p>
            </div>

            <Flex className="social-media" gap="0.75rem">
              <Link to="https://twitter.com/" target="_blank" className="social-media-icon">
                <TwitterIcon />
              </Link>

              <Link to="https://www.facebook.com/" target="_blank" className="social-media-icon">
                <FacebookIcon />
              </Link>

              <Link to="https://www.instagram.com/" target="_blank" className="social-media-icon">
                <InstagramIcon />
              </Link>

              <Link to="https://github.com/" target="_blank" className="social-media-icon">
                <GitHubIcon />
              </Link>
            </Flex>
          </Flex>

          <Flex gap="7rem">
            {footerConfig.map((row) => (
              <Flex gap="1.625rem" vertical>
                <h4 className="secondary">{t(row.category)}</h4>

                {row.items.map((item) => (
                  <p>{t(item.title)}</p>
                ))}
              </Flex>
            ))}
          </Flex>
        </Flex>

        <Divider />
      </div>
    </footer>
  );
};

export default PageFooter;
