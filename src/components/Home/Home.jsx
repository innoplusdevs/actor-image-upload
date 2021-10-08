import React from 'react';
import { TopPopular } from '../TopPopular/TopPopular';
import { UploadImage } from '../UploadImage/UploadImage';

export const Home = () => {
    return (
        <div style={styles.container}>
            <UploadImage />
            <TopPopular />
        </div>
    );
}

const styles = {
    container: {
        background: 'rgba(0,0,0, 0.9)',
        color: '#fff',
        minHeight: '100vh',
        padding: '1rem'
    }
}