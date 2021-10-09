import { message } from "antd";
import axios from "axios";

export const getTopPopular = async () => {
    try {
        let { data: { results } } = await axios.get('https://api.themoviedb.org/3/person/popular', {
            params: {
                api_key: process.env.REACT_APP_TheMovieDb_KEY,
                language: 'es-ES',
                page: '1',
            }
        });

        results.splice(10, results.length - 1);

        return results;
    } catch (error) {
        message.error('Algo fue mal al cargar las personas populares');
    }
}