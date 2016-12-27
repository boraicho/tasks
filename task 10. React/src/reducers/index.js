import {combineReducers} from 'redux';

import categories from './categories';
import tasks from './tasks';

export default combineReducers({
    categories,
    tasks
})