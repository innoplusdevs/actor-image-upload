import React from 'react';

import { useHistory, useLocation } from 'react-router';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import queryString from "query-string";

import { actorInfoRequest } from '../../helpers/actorInfoRequest';
import { setActor } from '../../actions/actor';

import { MoviesInfo } from './MoviesInfo';

import { Divider, Button, Avatar, Tag, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { deleteActor } from '../../actions/actor';


export const ActorInfo = () => {
  const location = useLocation();

  let data = useSelector(state => state.actor);

  if (!data.name) {
    const { q } = queryString.parse(location.search);
    data = actorInfo(q);
  }

  const { photo, name, gender, popularity, movies } = data;

  const dispatch = useDispatch();
  const history = useHistory();

  const handleBack = (e) => {
    e.preventDefault();

    dispatch(deleteActor());
    history.goBack();
  }

  async function actorInfo(name) {
    const { data } = await actorInfoRequest(name);
    dispatch(setActor(data));
  }

  return (
    <div style={styles.container}>
      {!data.name ?
        <div style={{ fontSize: "2em", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          Loading...
        </div>
        :
        <div style={{ padding: "10px", overflow: "hidden" }}>
          <Button type="danger" style={{ marginBottom: "10px" }} onClick={handleBack}>
            <ArrowLeftOutlined />Regresar
          </Button>
          <div>
            <Space align="center" direction="vertical" style={{ width: "100%" }}>
              {photo &&
                <Avatar
                  size={{ xs: 40, sm: 60, md: 80, lg: 100, xl: 120, xxl: 150 }}
                  src={`https://image.tmdb.org/t/p/original${photo}`}
                  style={styles.avatar}
                />
              }
              <h2 style={{ color: '#fff' }}>{name}</h2>
              <Tag color="gray">
                <p style={{ fontSize: '1.2em',color: '#fff', margin: '0' }}>{gender}</p>
              </Tag>
              <p style={{ color: '#fff' }}>Popularidad: {popularity}</p>
            </Space>
            <Divider type="vertical" style={{ height: "auto" }} />
            <MoviesInfo movies={movies} />
          </div>
        </div>
      }
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'rgba(0,0,0, 0.9)',
  },

  avatar: {
    boxShadow: '2px 2px 10px 2px  rgba(0, 0, 0, 0.2)',
  }
} 