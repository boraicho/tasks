import * as types from '../constants/action-types';

export function getCourse(course) {
    return {
        type: types.GET_COURSE,
        course
    };
};

export function getCourses(courses) {
    return {
        type: types.GET_ALL_COURSE,
        courses
    };
};

export function addCourse(newCourse) {
    return {
        type: types.ADD_COURSE,
        newCourse
    };
};

export function deleteCourse(id) {
    return {
        type: types.DELETE_COURSE,
        id
    };
};

export function changeCourse(id, newCourse) {
    return {
        type: types.CHANGE_COURSE,
        id,
        newCourse
    };
};

export function filterCourse(filter) {
    return {
        type: types.FILTER_COURSE,
        filter
    };
};