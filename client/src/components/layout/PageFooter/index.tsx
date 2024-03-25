import { Flex, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TwitterIcon from '@/assets/icons/twitter.svg?react';
import FacebookIcon from '@/assets/icons/facebook.svg?react';
import InstagramIcon from '@/assets/icons/instagram.svg?react';
import GitHubIcon from '@/assets/icons/github.svg?react';

import VisaBadgeIcon from '@/assets/icons/visa-badge.svg?react';
import MastercardBadgeIcon from '@/assets/icons/mastercard-badge.svg?react';
import PayPalBadgeIcon from '@/assets/icons/paypal-badge.svg?react';
import ApplePayBadgeIcon from '@/assets/icons/apple-pay-badge.svg?react';
import GooglePayBadgeIcon from '@/assets/icons/google-pay-badge.svg?react';

import logo from '@/assets/img/logo.svg';

import './index.scss';

type FooterConfig = Array<{
  category: string;
  items: Array<{ title: string; link?: string }>;
}>;

const footerConfig: FooterConfig = [
  {
    category: 'COMPANY',
    items: [{ title: 'ABOUT' }, { title: 'FEATURES' }, { title: 'WORKS' }, { title: 'CAREER' }],
  },
  {
    category: 'HELP',
    items: [
      { title: 'CUSTOMER_SUPORT' },
      { title: 'DELIVERY_DETAILS' },
      { title: 'TERMS_AND_CONDITIONS' },
      { title: 'PRIVACY_POLICY' },
    ],
  },
  {
    category: 'FAQ',
    items: [{ title: 'ACCOUNT' }, { title: 'MANAGE_DELIVERIES' }, { title: 'ORDERS' }, { title: 'PAYMENT' }],
  },
];

const PageFooter = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer-inner">
        <Flex justify="space-between" gap="7.5rem" className="footer-menu">
          <Flex className="main-footer-info" justify="space-between" gap="1.25rem" vertical>
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

          <Flex gap="3rem 7rem" wrap="wrap">
            {footerConfig.map((row) => (
              <Flex className="footer-menu-item" gap="1.5rem" vertical>
                <h4 className="secondary">{t(row.category)}</h4>

                {row.items.map((item) => (
                  <Link to={item.link ?? ''}>{t(item.title)}</Link>
                ))}
              </Flex>
            ))}
          </Flex>
        </Flex>

        <Divider />

        <Flex className="additional-info" justify="space-between">
          <p style={{ marginTop: 5 }}>{t('ALL_RIGHTS_RESERVED', { year: new Date().getFullYear() })}</p>

          <div className="payment-options">
            <VisaBadgeIcon />
            <MastercardBadgeIcon />
            <PayPalBadgeIcon />
            <ApplePayBadgeIcon />
            <GooglePayBadgeIcon />
          </div>
        </Flex>
      </div>
    </footer>
  );
};

export default PageFooter;
