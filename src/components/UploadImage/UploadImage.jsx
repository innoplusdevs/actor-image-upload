import React from 'react';

import { Upload, message, Space } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { actorNameRequest } from '../../helpers/actorNameRequest';

const { Dragger } = Upload;

export const UploadImage = () => {
  const props = {
    name: 'image',
    multiple: false,
    action: 'https://whois.nomada.cloud/upload',

    //manipular onChange
    async onChange(info) {
      const { status } = info.file;

      const fileType = (info.file.name).split('.').pop();

      if (fileType === 'png' || fileType === 'jpg') {
        if (status === 'done') {
          await actorNameRequest(info.file.originFileObj);
          console.log(info.file.originFileObj, 'done');
        } else if (status === 'error') {
          message.error(`${info.file.name} la carga del archivo falló.`);
        }
      } else if (status === 'done') {
        message.error('Solo se permiten imágenes jpg o png.');
      }
    }
  };

  return (
    <Space align="center" direction="vertical" style={{ width: "100%" }}>
      <h2>¿Quién es ese actor?</h2>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Haz click o arrastra una imagen</p>
        <p className="ant-upload-hint">
          Selcciona la foto de un actor famoso para conocer quién es y en qué películas ha salido
        </p>
      </Dragger>
    </Space>
  );
}
