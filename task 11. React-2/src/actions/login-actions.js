import * as types from '../constants/action-types';

export function getUsers(users) {
    type: types.GET_USERS,
    users
}

export function addUser(newUser) {
    return {
        type: types.ADD_USER,
        newUser
    };
};

export function deleteUser(id) {
    return {
        type: types.DELETE_USER,
        id
    };
};

export function userSucces(user) {
    return {
        type: types.USER_SUCCES,
        user
    };
};