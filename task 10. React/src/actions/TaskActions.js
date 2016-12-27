import * as types from '../constants/ActionTypes';

export function addTask(newTask) {
    return {
        type: types.ADD_TASK,
        newTask
    };
}

export function deleteTask(id) {
    return {
        type: types.DELETE_TASK,
        id
    };
}

export function changeTask(id, newTask) {
    return {
        type: types.CHANGE_TASK,
        id,
        newTask
    };
}

export function getTask(id) {
    return {
        type: types.GET_TASK,
        id
    };
}

export function getTaskInCategory(idCategory) {
    return {
        type: types.GET_TASKS_IN_CATEGORY,
        idCategory
    };
}