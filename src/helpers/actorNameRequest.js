
import axios from 'axios';

import { message } from 'antd';

export const actorNameRequest = async (image) => {
  const form = new FormData();
  console.log(image, 'event');
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
  } catch (error) {
    console.log(error, 'error');
    message.error(`No se reconece la imagen`);
  }
}

// export const actorNameRequest = async (image) => {
//   console.log(image.file, 'image');

//   const form = new FormData();
//   form.append('file', image.file); // encapsula el archivo

//   //peticion http
//   try {
//     const { data: { error, actorName } } = await axios.post('https://whois.nomada.cloud/upload', form, {
//       headers: {
//         'Nomada': process.env.REACT_APP_WhoIs_KEY,
//         'Content-Type': 'multipart/form-data'
//       }
//     });

//     if (error) throw new Error(error);
//     message.success(`${image.file.name} documento cargado exitosamente.`);

//     console.log(actorName, 'actorName');
//   } catch (error) {
//     message.error(`No se reconece la foto`);
//   }
// }
