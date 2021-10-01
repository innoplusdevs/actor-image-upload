import { types } from '../types/types';

export const actorReducer = (state = {}, action) => {

    switch (action.type) {
        case types.setActor:
            return {
                ...action.payload
            }

        default:
            return state;
    }
}