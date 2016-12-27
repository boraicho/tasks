import { createStore } from 'redux';
import todoApp from '../reducers/reducer';

let store = createStore(todoApp);

export default store;