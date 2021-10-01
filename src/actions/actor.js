import { types } from '../types/types';

export const setActor = (info) => ({
  type: types.setActor,
  payload: {
    ...info
  }
});

export const deleteActor = () => ({
  type: types.deleteActor
});