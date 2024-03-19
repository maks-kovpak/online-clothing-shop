import { useState } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { ALLOWED_MIME_TYPES } from '@server/lib/constants';
import ImgCrop from 'antd-img-crop';
import { useTranslation } from 'react-i18next';

import './index.scss';

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

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

type OmitProps = 'listType' | 'showUploadList' | 'action' | 'beforeUpload' | 'onChange';

type RestUploadProps = Omit<UploadProps, OmitProps>;

const UploadImage: FC<
  RestUploadProps & {
    imageUrl: string | undefined;
    setImageUrl: Dispatch<SetStateAction<string | undefined>>;
    setFile?: Dispatch<SetStateAction<FileType | undefined>>;
  }
> = ({ imageUrl, setImageUrl, setFile, ...props }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      if (setFile) {
        setFile(info.file.originFileObj as FileType);
      }

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
        listType="picture-card"
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
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
