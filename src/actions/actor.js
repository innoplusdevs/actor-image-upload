import { types } from '../types/types';

export const setActor = (info) => ({
  type: types.setActor,
  payload: {
    ...info
  }
});