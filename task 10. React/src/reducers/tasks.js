import * as types from '../constants/ActionTypes';
import _ from 'lodash';

const local = JSON.parse(localStorage.getItem('tasks'));
const InitialState = {
    tasks: local !== null ? local : []
    // filterTasks: []
};

export default function tasks(state = InitialState, action) {
    let _tasks;
    switch (action.type) {
        case types.ADD_TASK:
            _tasks = [
                ...state.tasks,
                action.newTask
            ];
            _updateLocalStorage(_tasks);
            return Object.assign({}, state, { tasks: _tasks });
        case types.DELETE_TASK:
            const newTasks = state.tasks.filter(task => task.id !== action.id);
            _updateLocalStorage(newTasks);
            return Object.assign({}, state, { tasks: newTasks });
        case types.CHANGE_TASK:
            _.remove(state.tasks, function (task) {
                return task.id === action.id;
            });
            _tasks = [
                ...state.tasks,
                action.newTask
            ];
            _updateLocalStorage(_tasks);
            return Object.assign({}, state, { tasks: _tasks });
        default:
            return state;
    }
};

function _updateLocalStorage(tasks) {
    const localTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', localTasks);
};