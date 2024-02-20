import type { FC, ReactElement } from 'react';
import MetaTags from '@/components/features/MetaTags';
import authBannerImage from '@/assets/img/auth-page/auth-page-bnr.webp';
import { Form, Typography } from 'antd';
import { Input } from '@/ui';

import './index.scss';

const AuthPageLayout: FC<{
  pageTitle: string;
  pageDescription: string;
  form: ReactElement;
}> = ({ pageTitle, pageDescription, form }) => {
  return (
    <>
      <MetaTags
        title={`SHOP.CO | ${pageTitle}`}
        description={pageDescription}
        imagePath="/opengraph/og-image-main.webp"
      />

      <main>
        <section className="user-auth-section">
          <div className="bnr-image">
            <img src={authBannerImage} alt="" />
          </div>

          <div className="form auth-form">
            <div className="inner">
              <div className="form-text">
                <Typography.Title level={2} className="secondary">
                  Create an account
                </Typography.Title>
                <p>Enter your details below</p>
              </div>

              <Form layout="vertical" autoComplete="off">
                <Form.Item name="email" validateFirst rules={[{ type: 'email', message: 'Email is not valid' }]}>
                  <Input placeholder="Your email" size="large" />
                </Form.Item>
              </Form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AuthPageLayout;
