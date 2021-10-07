import React, { useState } from 'react';
import { Modal, Image } from 'antd';
import { StarFilled } from '@ant-design/icons';

export const MoviesInfo = ({ movies }) => {
    const [isModalVisible, setIsModalVisible] = useState({ open: false, data: {} });
    console.log(movies);

    const showModal = (title, overview, vote_average) => {
        setIsModalVisible({ open: true, data: { title, overview, vote_average } });
    };

    const handleOk = () => {
        setIsModalVisible({ open: false, data: {} });
    };

    const handleCancel = () => {
        setIsModalVisible({ open: false, data: {} });
    };

    const title =
        <div style={styles.title}>
            <div>
                {isModalVisible.data.title}
            </div>
            <div>
                {isModalVisible.data.vote_average}
                <StarFilled style={{ color: 'gold' }} />/10
            </div>
        </div>;

    return (
        <>
            <Modal
                style={{ borderRadius: '10px' }}
                title={title}
                visible={isModalVisible.open}
                onOk={handleOk} onCancel={handleCancel}>
                <p style={{ sfontWeight: '600' }}>Sinopsis:</p>
                <p>{isModalVisible.data.overview}</p>
            </Modal>
            <div>
                {
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }}>
                        {movies.map(({ poster_path, id, title, overview, vote_average }) => (
                            <Image
                                key={id}
                                preview={false}
                                width={200}
                                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                                onClick={() => showModal(title, overview, vote_average)}
                                style={styles.image}
                            />
                        ))}
                    </div>
                }
            </div>
        </>
    );
};


const styles = {
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1.2rem 0 0',
    },

    image: {
        margin: '0.5rem',
        borderRadius: '5px',
        boxShadow: '2px 2px 10px 2px  rgba(0, 0, 0, 0.2)',
        cursor: 'pointer'
    }

}