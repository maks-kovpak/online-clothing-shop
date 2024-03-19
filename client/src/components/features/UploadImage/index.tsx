import { useState } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { ALLOWED_MIME_TYPES } from '@server/lib/constants';
import ImgCrop from 'antd-img-crop';
import { useTranslation } from 'react-i18next';

import './index.scss';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType, errorMessage: string) => {
  const isImage = ALLOWED_MIME_TYPES.includes(file.type);
  if (!isImage) message.error(errorMessage);

  return isImage;
};

type RestUploadProps = Omit<
  UploadProps,
  'name' | 'listType' | 'className' | 'showUploadList' | 'beforeUpload' | 'onChange'
>;

const UploadImage: FC<
  RestUploadProps & {
    imageUrl: string | undefined;
    setImageUrl: Dispatch<SetStateAction<string | undefined>>;
  }
> = ({ imageUrl, setImageUrl, ...props }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{t('UPLOAD')}</div>
    </button>
  );

  return (
    <ImgCrop modalTitle={t('EDIT_IMAGE')} modalOk={t('OK')} modalCancel={t('CANCEL')} rotationSlider>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={(file) => beforeUpload(file, t('UPLOAD_ONLY_IMAGES'))}
        onChange={handleChange}
        {...props}
      >
        {imageUrl ? <img src={imageUrl} alt="" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </ImgCrop>
  );
};

export default UploadImage;
