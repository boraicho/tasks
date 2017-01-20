import { combineReducers } from 'redux';

import userList from './users';
import courseList from './courses';

export default combineReducers({
    userList,
    courseList
});