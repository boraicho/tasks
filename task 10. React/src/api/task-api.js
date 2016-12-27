import store from '../store/store';
import * as taskActions from '../actions/TaskActions';

export function getTask(id) {
    return store.dispatch(taskActions.getTask(id));
}

export function addTask(title, categoryId) {
    const newTask = {
        id: Date.now().toString(),
        title: title,
        description: '',
        done: false,
        categoryId: categoryId
    }
    return store.dispatch(taskActions.addTask(newTask));
}

export function deleteTask(id) {
    return store.dispatch(taskActions.deleteTask(id));
}

export function getTaskInCategory(categoryId) {
    return store.dispatch(taskActions.getTaskInCategory(categoryId));
}

export function changeTask(id, title, done, description, categoryId) {
    const newTask = {
        id: id,
        title: title,
        description: description,
        done: done,
        categoryId: categoryId
    }
    return store.dispatch(taskActions.changeTask(id, newTask));
}
