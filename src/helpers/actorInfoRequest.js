
import axios from 'axios';
// import queryString from "query-string";

import { message } from 'antd';

export const actorInfoRequest = async (img) => {
  const actorName = await actorNameRequest(img);

  if (actorName) {
    const { profile_path, name, gender, popularity, known_for } = await actorDataRequest(actorName);

    return {
      error: "",
      data: {
        name,
        popularity,
        photo: profile_path,
        movies: [...known_for],
        gender: gender === 0 ? 'Desconocido' :
          gender === 2 ? 'Hombre' : 'Mujer',
      }
    };
  }

  return {
    error: "error",
    data: ""
  }

}

const actorNameRequest = async (image) => {
  const form = new FormData();
  form.append('file', image); // encapsula el archivo

  //peticion http
  try {
    const { data: { error, actorName } } = await axios.post('https://whois.nomada.cloud/upload', form, {
      headers: {
        'Nomada': process.env.REACT_APP_WhoIs_KEY,
        'Content-Type': 'multipart/form-data'
      }
    });

    if (error) throw new Error(error);
    message.success(`Imagen cargada correctamente`);

    return actorName;
  } catch (error) {
    message.error(`No se reconece la imagen`);
  }
}


const actorDataRequest = async (name) => {
  try {
    const { data } = await axios.get('https://api.themoviedb.org/3/search/person', {
      params: {
        api_key: process.env.REACT_APP_TheMovieDb_KEY,
        language: 'es-ES',
        page: '1',
        include_adult: 'true',
        query: name
      }
    });

    return data.results[0];
  } catch (error) {
    message.error('Algo fue mal por favor, intente otra vez');
  }
}