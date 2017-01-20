import * as types from '../constants/action-types';
import _ from 'lodash';

const InitialState = {
    courses: [],
    course: {},
    filter: ''
};

export default function courses(state = InitialState, action) {
    switch (action.type) {
        case types.GET_ALL_COURSE:
            return Object.assign({}, state, { courses: action.courses });
        case types.GET_COURSE:
            return Object.assign({}, state, { course: action.course });
        case types.ADD_COURSE:
            return Object.assign({}, state, { courses: action.newCourse });
        case types.DELETE_COURSE:
            const newCourses = _.filter(state.courses, course => course.id != action.id);
            return Object.assign({}, state, { courses: newCourses });
        case types.FILTER_COURSE:
            return Object.assign({}, state, { filter: action.filter });
        default: return state;
    }
};