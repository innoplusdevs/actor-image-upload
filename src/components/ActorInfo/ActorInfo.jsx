import React from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { useHistory } from 'react-router';

import { Col, Divider, Row, List, Button, Avatar, Tag, Space } from 'antd';
import { ArrowLeftOutlined, StarFilled } from '@ant-design/icons';
import { deleteActor } from '../../actions/actor';


export const ActorInfo = () => {
  const { photo, name, gender, popularity, movies } = useSelector(state => state.actor);
  const history = useHistory();

  const dispatch = useDispatch();

  const handleBack = (e) => {
    e.preventDefault();

    dispatch(deleteActor());
    history.goBack();
  }

  return (
    <div style={{ padding: "10px", overflow: "hidden" }}>
      <Button type="primary" style={{ marginBottom: "10px" }} onClick={handleBack}>
        <ArrowLeftOutlined />Regresar
      </Button>
      <Divider />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} md={6} justify="center">
          <Space align="center" direction="vertical" style={{ width: "100%" }}>
            {photo &&
              <Avatar
                size={{ xs: 40, sm: 60, md: 80, lg: 100, xl: 120, xxl: 150 }}
                src={`https://image.tmdb.org/t/p/original${photo}`} />
            }
            <h2>{name}</h2>
            <Tag color="yellow">{gender}</Tag>
            <p>Popularidad: {popularity}</p>
          </Space>
        </Col>
        <Divider type="vertical" style={{ height: "auto" }} />
        <Col className="gutter-row" xs={24} md={17}>
          <div>
            <h1>Películas:</h1>
            <List
              itemLayout="horizontal"
              dataSource={movies}
              renderItem={({ title, overview, vote_average, poster_path }) => (
                <>
                  <Row justify="space-between">
                    <Col>
                      <h3>{title}</h3>
                    </Col>
                    <Col>
                      <p>{vote_average}/10 <StarFilled style={{ color: "gold" }} /></p>
                    </Col>
                  </Row>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<img style={{ maxWidth: "120px", padding: "4px", borderRadius: "10px" }} src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="Movie" />}
                      description={overview}
                    />
                  </List.Item>
                </>
              )}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}
