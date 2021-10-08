import React from 'react';

import { useHistory } from 'react-router';

import { useDispatch } from 'react-redux';
import { setActor } from '../../actions/actor';

import { actorInfoRequest } from '../../helpers/actorInfoRequest';

import { Upload, message, Space } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

export const UploadImage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const props = {
    name: 'image',
    multiple: false,
    action: 'https://whois.nomada.cloud/upload',
    accept: '.jpg,.png',

    //manipular onChange
    async onChange(info) {
      const { status } = info.file;

      const fileType = (info.file.name).split('.').pop().toUpperCase();

      if (fileType === 'PNG' || fileType === 'JPG') {
        if (status === 'done') {
          const { error, data } = await actorInfoRequest(info.file.originFileObj);
          if (!error) {
            dispatch(setActor(data));
            history.push(`/actor-info?q=${data.name}`);
          }
        } else if (status === 'error') {
          message.error(`${info.file.name} la carga del archivo falló.`);
        }
      } else if (status === 'done') {
        message.error('Solo se permiten imágenes jpg o png.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <Space align="center" direction="vertical" style={{ width: "100%" }}>
        <h2 style={{ color: '#fff' }}>¿Quién es ese actor?</h2>
        <Dragger {...props} style={styles.dragger}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: 'red' }} />
          </p>
          <p className="ant-upload-text" style={styles.text}>Haz click o arrastra una imagen de un actor</p>
          <p className="ant-upload-hint" style={styles.text}>
            Selcciona la foto de un actor famoso para conocer quién es y en qué películas ha trabajado
          </p>
        </Dragger>
      </Space>
    </div>
  );
}


const styles = {
  container: {
    marginBottom: '2rem'
  },

  dragger: {
    padding: '10px',
    background: 'rgba(255, 255, 255, 0.1)'
  },

  text: {
    color: '#fff'
  }
}