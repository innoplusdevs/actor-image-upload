import { createStore, combineReducers } from 'redux';
import { actorReducer } from '../reducers/actorReducer';

const reducers = combineReducers({
  actor: actorReducer,
});


export const store = createStore(
  reducers,
);