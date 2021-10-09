import { Image } from 'antd';
import React from 'react';
import { getTopPopular } from '../../helpers/getTopPopular';
import { useFetch } from '../../hooks/useFetch';

export const TopPopular = () => {
    const { data } = useFetch(getTopPopular);
    console.log(data, 'data');

    return (
        <div>
            <h1 style={styles.title}>Top Popular:</h1>
            <>
                {data &&
                    <div style={styles.container} className="TopPopular">
                        {data.map(({ profile_path, name, id }) => (
                            <div style={styles.imageWrapper}>
                                <Image
                                    key={id}
                                    preview={false}
                                    width={150}
                                    src={`https://image.tmdb.org/t/p/original${profile_path}`}
                                    style={styles.image}
                                />
                                <h3 style={{ color: '#fff' }}>{name}</h3>
                            </div>
                        ))}
                    </div>
                }
            </>
        </div>
    )
}

const styles = {
    title: {
        color: '#fff'
    },

    container: {
        display: 'grid',
        gridAutoFlow: 'column',
        overflowX: 'scroll',
        gridGap: '5px',
    },

    imageWrapper: {
        color: '#fff'
    },

    image: {
        margin: '0.5rem',
        borderRadius: '5px',
        boxShadow: '2px 2px 10px 2px  rgba(0, 0, 0, 0.2)',
        pointerEvent: 'none'
    }
}
