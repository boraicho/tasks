import axios from 'axios';
import store from '../store/store';
import * as actions from '../actions/login-actions';

axios.defaults.baseURL = 'http://localhost:3001/';

export function getUsers() {
    return axios.get(`users`)
        .then(response => {
            store.dispatch(actions.getUsers(response.data));
            return response;
        });
};

export function addUser(login, password) {
    return axios.post('users', {
        login: login,
        password: password
    }).then(response => {
        store.dispatch(actions.addUser(response.data));
        return response;
    });
};

export function deleteUser(id) {
    return axios.delete(`users/${id}`)
        .then(response => {
            store.dispatch(actions.deleteUser(response.data));
            return response;
        });
};

export function userSucces(login, password) {
    const user = {
        login: login,
        password: password
    }
    return store.dispatch(actions.userSucces(user));
}
