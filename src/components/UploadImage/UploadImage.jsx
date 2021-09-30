import React from 'react';

import axios from 'axios';

import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

export const UploadImage = () => {
  const props = {
    name: 'file',
    multiple: false,
    action: 'https://whois.nomada.cloud/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    async onDrop(e) {
      e.preventDefault();

      const form = new FormData();
      form.append('file', e.dataTransfer.files[0]); // encapsula el archivo

      //peticion http
      const resp = await axios.post('https://whois.nomada.cloud/upload', form, {
        headers: {
          'Nomada': process.env.REACT_APP_WhoIs_KEY,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(resp, 'resp');
    }
  };

  return (
    <div>
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
    </div>
  )
}
