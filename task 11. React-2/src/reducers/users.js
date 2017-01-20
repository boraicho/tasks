import * as types from '../constants/action-types';
import _ from 'lodash';

const InitialState = {
    users: [],
    succes: {}
};

export default function courses(state = InitialState, action) {
    switch (action.type) {
        case types.GET_USERS:
            return Object.assign({}, state, { users: action.users });
        case types.ADD_USER:
            return Object.assign({}, state, { users: action.user });
        case types.DELETE_USER:
            const newUsers = _.filter(state.users, user => user.id != action.id);
            return Object.assign({}, state, { users: newUsers });
        case types.USER_SUCCES:
            const userSucces = _.filter(state.users, user =>
                user.login === action.login &&
                user.password === action.password
            );
            return Object.assign({}, state, { succes: userSucces });
        default: return state;
    }
};