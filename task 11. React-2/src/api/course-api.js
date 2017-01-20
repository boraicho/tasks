import axios from 'axios';
import store from '../store/store';
import * as actions from '../actions/courses-actions';

axios.defaults.baseURL = 'http://localhost:3001/';

export function getCourses() {
    return axios.get('courses')
        .then(response => {
            store.dispatch(actions.getCourses(response.data));
            return response;
        });
};

export function getCourse(id) {
    return axios.get(`courses/${id}`)
        .then(response => {
            store.dispatch(actions.getCourse(response.data));
            return response;
        });
};

export function addCourse(title, time, date, autors) {
    return axios.post('courses', {
        title: title,
        time: time,
        date: date,
        autors: autors
    }).then(response => {
        store.dispatch(actions.addCourse(response.data));
        return response;
    });
};

export function deleteCourse(id) {
    return axios.delete(`courses/${id}`)
        .then(response => {
            store.dispatch(actions.deleteCourse(id));
            return response;
        });
};

export function updateCourse(id, title, time, date, autors) {
    return axios.patch(`courses/${id}`, {
        title: title,
        time: time,
        date: date,
        autors: autors
    }).then(response => {
        store.dispatch(actions.changeCourse(response.data));
        return response;
    });
};

export function filterCourse(filter) {
    return store.dispatch(actions.filterCourse(filter));
};